import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSlug,
  cleanValue,
  cleanValueBoolean
} from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CreatePageCommand } from '@/commands/implements/pages/create-page.command';
import { PageType } from '@/enums/page-type.enum';
import {
  DataNotFoundException,
  PageNotFoundException,
  ParamNotFoundException,
  SlugAlreadyExistsException
} from '@/errors';
import { CreatePageRepository } from '@/repositories/pages/create-page';
import { FindAllPagesService } from '@/services/pages/find-all-pages';
import { FindPageBySlugAndParentService } from '@/services/pages/find-page-by-slug-and-parent';
import { UpdateSiteService } from '@/services/sites/update-site';
import { CreateVersionService } from '@/services/versions/create-version';
import { UpdateVersionService } from '@/services/versions/update-version';

type CreatePageCommandKeys = keyof CreatePageCommand;

@CommandHandler(CreatePageCommand)
export class CreatePageCommandHandler
  implements ICommandHandler<CreatePageCommand>
{
  constructor(
    private readonly createPageRepository: CreatePageRepository,
    private readonly createVersionService: CreateVersionService,
    private readonly findAllPagesService: FindAllPagesService,
    private readonly updateVersionService: UpdateVersionService,
    private readonly updateSiteService: UpdateSiteService,
    private readonly findPageBySlugAndParentService: FindPageBySlugAndParentService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePageCommandKeys>('parent');
    }
    if (data?.type && data?.type === PageType.EXTERNAL && !data?.url) {
      throw new ParamNotFoundException<CreatePageCommandKeys>('url');
    }

    const initialVersion = await this.createVersionService.execute({
      name: 'Start version',
      app: data.app,
      createdBy: data.createdBy
    });

    const slug = cleanSlug(data.title + nanoid(8));
    try {
      const pageWithSlug = await this.findPageBySlugAndParentService.execute({
        slug,
        parent: data.parent
      });
      if (pageWithSlug) {
        throw new SlugAlreadyExistsException();
      }
    } catch (error) {
      if (error instanceof SlugAlreadyExistsException) {
        throw error;
      }
    }
    const pageCreated = await this.createPageRepository.execute({
      ...data,
      type: data?.type || PageType.DEFAULT,
      canRemove: !!data?.canRemove,
      version: initialVersion.id,
      draftVersion: initialVersion.id,
      slug
    });
    if (!pageCreated) {
      throw new PageNotFoundException();
    }
    const pageModel = this.publisher.mergeObjectContext(pageCreated);
    pageModel.createdPage({
      createdBy: data.createdBy
    });
    pageModel.commit();

    await this.updateVersionService.execute({
      data: {
        parent: pageCreated.id,
        updatedBy: data.createdBy
      },
      where: {
        app: data.app,
        version: initialVersion.id
      }
    });

    try {
      const isFirstPage = await this.isFirstPage(pageCreated.parent);
      if (isFirstPage) {
        await this.updateSiteService.execute({
          data: {
            homePage: pageCreated.id,
            updatedBy: data.createdBy
          },
          where: {
            app: pageCreated.app,
            site: pageCreated.parent
          }
        });
      }
    } catch (error) {}

    return pageCreated;
  }

  private clearData(command: CreatePageCommand): CreatePageCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      title: cleanValue(command?.title),
      url: cleanValue(command?.url),
      type: cleanValue(command?.type),
      canRemove: cleanValueBoolean(command?.canRemove),
      parent: cleanValue(command?.parent)
    });
  }

  private async isFirstPage(parent: string) {
    const pages = await this.findAllPagesService.execute({
      page: {
        limit: 1
      },
      where: {
        AND: {
          parent: {
            equals: parent
          }
        }
      }
    });
    return pages?.totalCount === 1;
  }
}
