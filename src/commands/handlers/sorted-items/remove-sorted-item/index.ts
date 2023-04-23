import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveSortedItemCommand } from '@/commands/implements/sorted-items/remove-sorted-item.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SortedItemNotFoundException
} from '@/errors';
import { RemoveSortedItemRepository } from '@/repositories/sorted-items/remove-sorted-item';
import { FindSortedItemByIdService } from '@/services/sorted-items/find-sorted-item-by-id';

@CommandHandler(RemoveSortedItemCommand)
export class RemoveSortedItemCommandHandler
  implements ICommandHandler<RemoveSortedItemCommand>
{
  constructor(
    private readonly findSortedItemByIdService: FindSortedItemByIdService,
    private readonly removeSortedItemRepository: RemoveSortedItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveSortedItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    if (!data.where?.sortedItem) {
      throw new ParamNotFoundException('sortedItemId');
    }

    const sortedItem = await this.findSortedItemByIdService.execute(
      data.where?.sortedItem
    );
    if (!sortedItem) {
      throw new SortedItemNotFoundException();
    }

    const removed = await this.removeSortedItemRepository.execute({
      where: {
        ...data.where,
        sortedItem: splitServiceId(data.where?.sortedItem)?.id
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const sortedItemModel = this.publisher.mergeObjectContext(sortedItem);
    sortedItemModel.removedSortedItem({
      removedBy: data.where.removedBy
    });
    sortedItemModel.commit();

    return sortedItem;
  }

  private clearData(command: RemoveSortedItemCommand): RemoveSortedItemCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        sortedItem: cleanValue(command?.where?.sortedItem)
      })
    });
  }
}
