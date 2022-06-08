import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemovePageCommand } from '@/commands/implements/pages/remove-page.command';
import {
  PageNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindPageByIdRepository } from '@/repositories/pages/find-page-by-id';
import { RemovePageRepository } from '@/repositories/pages/remove-page';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemovePageCommandKeys = keyof RemovePageCommand;

@CommandHandler(RemovePageCommand)
export class RemovePageCommandHandler
  implements ICommandHandler<RemovePageCommand>
{
  constructor(
    private readonly findPageByIdRepository: FindPageByIdRepository,
    private readonly removePageRepository: RemovePageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePageCommand) {
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

    const removed = await this.removePageRepository.execute({
      where: {
        pageId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const pageModel = this.publisher.mergeObjectContext(page);
    pageModel.removedPage();
    pageModel.commit();

    return page;
  }

  private clearData(command: RemovePageCommand): RemovePageCommand {
    return cleanObject({
      where: cleanObject({
        pageId: cleanValue(command?.where?.pageId)
      })
    });
  }
}
