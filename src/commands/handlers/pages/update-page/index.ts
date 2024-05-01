import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdatePageCommand } from '@/commands/implements/pages/update-page.command';
import {
  DataNotFoundException,
  PageNotFoundException,
  ParamNotFoundException,
  SlugAlreadyExistsException
} from '@/errors';
import { FindPageByIdRepository } from '@/repositories/pages/find-page-by-id';
import { UpdatePageRepository } from '@/repositories/pages/update-page';
import { FindPageBySlugAndParentService } from '@/services/pages/find-page-by-slug-and-parent';

@CommandHandler(UpdatePageCommand)
export class UpdatePageCommandHandler
  implements ICommandHandler<UpdatePageCommand>
{
  constructor(
    private readonly findPageByIdRepository: FindPageByIdRepository,
    private readonly updatePageRepository: UpdatePageRepository,
    private readonly findPageBySlugAndParentService: FindPageBySlugAndParentService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const pageId = splitServiceId(data.where?.page)?.id;
    if (!pageId) {
      throw new ParamNotFoundException('pageId');
    }

    const page = await this.findPageByIdRepository.execute(pageId);
    if (!page) {
      throw new PageNotFoundException();
    }

    if (data?.data?.slug && page?.slug !== data?.data?.slug) {
      try {
        const pageWithSlug = await this.findPageBySlugAndParentService.execute({
          slug: data?.data?.slug,
          parent: page.parent
        });
        if (pageWithSlug) {
          throw new SlugAlreadyExistsException();
        }
      } catch (error) {
        if (error instanceof SlugAlreadyExistsException) {
          throw error;
        }
      }
    }
    const updated = await this.updatePageRepository.execute({
      ...data,
      where: {
        ...data.where,
        page: pageId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const pageUpdated = await this.findPageByIdRepository.execute(pageId);
    if (!pageUpdated) {
      throw new PageNotFoundException();
    }
    const pageModel = this.publisher.mergeObjectContext(pageUpdated);
    pageModel.updatedPage({
      updatedBy: data.data.updatedBy
    });
    pageModel.commit();

    return pageUpdated;
  }

  private clearData(command: UpdatePageCommand): UpdatePageCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        page: cleanValue(command?.where?.page)
      }),
      data: cleanObject({
        title: cleanValue(command?.data?.title),
        type: cleanValue(command?.data?.type),
        url: cleanValue(command?.data?.url),
        slug: cleanValue(command?.data?.slug),
        draftVersion: cleanValue(command?.data?.draftVersion),
        version: cleanValue(command?.data?.version),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
