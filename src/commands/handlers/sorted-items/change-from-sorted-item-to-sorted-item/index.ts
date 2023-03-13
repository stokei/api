import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { ChangeFromSortedItemToSortedItemCommand } from '@/commands/implements/sorted-items/change-from-sorted-item-to-sorted-item.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SortedItemNotFoundException
} from '@/errors';
import { FindSortedItemByIdService } from '@/services/sorted-items/find-sorted-item-by-id';
import { UpdateSortedItemService } from '@/services/sorted-items/update-sorted-item';

type ChangeFromSortedItemToSortedItemCommandKeys =
  keyof ChangeFromSortedItemToSortedItemCommand;

@CommandHandler(ChangeFromSortedItemToSortedItemCommand)
export class ChangeFromSortedItemToSortedItemCommandHandler
  implements ICommandHandler<ChangeFromSortedItemToSortedItemCommand>
{
  constructor(
    private readonly findSortedItemByIdService: FindSortedItemByIdService,
    private readonly updateSortedItemService: UpdateSortedItemService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangeFromSortedItemToSortedItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.fromItem) {
      throw new ParamNotFoundException<ChangeFromSortedItemToSortedItemCommandKeys>(
        'fromItem'
      );
    }
    if (!data?.toItem) {
      throw new ParamNotFoundException<ChangeFromSortedItemToSortedItemCommandKeys>(
        'toItem'
      );
    }

    const fromSortedItem = await this.findSortedItemByIdService.execute(
      data.fromItem
    );
    if (!fromSortedItem) {
      throw new SortedItemNotFoundException();
    }
    const toSortedItem = await this.findSortedItemByIdService.execute(
      data.toItem
    );
    if (!toSortedItem) {
      throw new SortedItemNotFoundException();
    }

    await this.updateSortedItemService.execute({
      data: {
        index: toSortedItem.index,
        updatedBy: data.updatedBy
      },
      where: {
        app: data.app,
        sortedItem: fromSortedItem.id
      }
    });
    try {
      await this.updateSortedItemService.execute({
        data: {
          index: fromSortedItem.index,
          updatedBy: data.updatedBy
        },
        where: {
          app: data.app,
          sortedItem: toSortedItem.id
        }
      });
    } catch (error) {
      await this.updateSortedItemService.execute({
        data: {
          index: fromSortedItem.index,
          updatedBy: data.updatedBy
        },
        where: {
          app: data.app,
          sortedItem: fromSortedItem.id
        }
      });
      return false;
    }

    return true;
  }

  private clearData(
    command: ChangeFromSortedItemToSortedItemCommand
  ): ChangeFromSortedItemToSortedItemCommand {
    return cleanObject({
      updatedBy: cleanValue(command?.updatedBy),
      app: cleanValue(command?.app),
      fromItem: cleanValue(command?.fromItem),
      toItem: cleanValue(command?.toItem)
    });
  }
}
