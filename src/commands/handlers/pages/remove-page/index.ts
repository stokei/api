import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemovePageCommand } from '@/commands/implements/pages/remove-page.command';
import {
  DataNotFoundException,
  PageNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindPageByIdRepository } from '@/repositories/pages/find-page-by-id';
import { RemovePageRepository } from '@/repositories/pages/remove-page';

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
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const pageId = splitServiceId(data.where?.page)?.id;
    if (!pageId) {
      throw new ParamNotFoundException('pageId');
    }

    const page = await this.findPageByIdRepository.execute(pageId);
    if (!page) {
      throw new PageNotFoundException();
    }

    const removed = await this.removePageRepository.execute({
      where: {
        ...data.where,
        page: pageId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const pageModel = this.publisher.mergeObjectContext(page);
    pageModel.removedPage({
      removedBy: data.where.removedBy
    });
    pageModel.commit();

    return page;
  }

  private clearData(command: RemovePageCommand): RemovePageCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        page: cleanValue(command?.where?.page)
      })
    });
  }
}
