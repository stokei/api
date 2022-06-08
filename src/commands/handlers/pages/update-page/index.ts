import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePageCommand } from '@/commands/implements/pages/update-page.command';
import {
  PageNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindPageByIdRepository } from '@/repositories/pages/find-page-by-id';
import { UpdatePageRepository } from '@/repositories/pages/update-page';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdatePageCommandKeys = keyof UpdatePageCommand;

@CommandHandler(UpdatePageCommand)
export class UpdatePageCommandHandler
  implements ICommandHandler<UpdatePageCommand>
{
  constructor(
    private readonly findPageByIdRepository: FindPageByIdRepository,
    private readonly updatePageRepository: UpdatePageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const pageId = splitServiceId(data.where?.pageId)?.id;
    if (!pageId) {
      throw new ParamNotFoundException('pageId');
    }

    const page = await this.findPageByIdRepository.execute(pageId);
    if (!page) {
      throw new PageNotFoundException();
    }

    const updated = await this.updatePageRepository.execute({
      ...data,
      where: {
        ...data.where,
        pageId
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
    pageModel.updatedPage();
    pageModel.commit();

    return pageUpdated;
  }

  private clearData(command: UpdatePageCommand): UpdatePageCommand {
    return cleanObject({
      where: cleanObject({
        pageId: cleanValue(command?.where?.pageId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
