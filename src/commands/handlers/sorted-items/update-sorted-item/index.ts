import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateSortedItemCommand } from '@/commands/implements/sorted-items/update-sorted-item.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SortedItemNotFoundException
} from '@/errors';
import { SortedItemModel } from '@/models/sorted-item.model';
import { UpdateSortedItemRepository } from '@/repositories/sorted-items/update-sorted-item';
import { FindSortedItemByIdService } from '@/services/sorted-items/find-sorted-item-by-id';

@CommandHandler(UpdateSortedItemCommand)
export class UpdateSortedItemCommandHandler
  implements ICommandHandler<UpdateSortedItemCommand>
{
  constructor(
    private readonly findSortedItemByIdService: FindSortedItemByIdService,
    private readonly updateSortedItemRepository: UpdateSortedItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateSortedItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const sortedItemId = splitServiceId(data.where?.sortedItem)?.id;
    if (!sortedItemId) {
      throw new ParamNotFoundException('sortedItemId');
    }

    const sortedItem = await this.findSortedItemByIdService.execute(
      data.where?.sortedItem
    );
    if (!sortedItem) {
      throw new SortedItemNotFoundException();
    }

    const updatedData = {
      ...data.data
    };

    const updated = await this.updateSortedItemRepository.execute({
      ...data,
      data: updatedData,
      where: {
        ...data.where,
        sortedItem: sortedItemId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }
    const sortedItemUpdated = new SortedItemModel({
      ...sortedItem,
      ...updatedData
    });
    const sortedItemModel =
      this.publisher.mergeObjectContext(sortedItemUpdated);
    sortedItemModel.updatedSortedItem({
      updatedBy: data.data.updatedBy
    });
    sortedItemModel.commit();

    return sortedItemUpdated;
  }

  private clearData(command: UpdateSortedItemCommand): UpdateSortedItemCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        sortedItem: cleanValue(command?.where?.sortedItem)
      }),
      data: cleanObject({
        item: cleanValue(command?.data?.item),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
