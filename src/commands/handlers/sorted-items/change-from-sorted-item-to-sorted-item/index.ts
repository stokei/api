import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { ChangeFromSortedItemToSortedItemCommand } from '@/commands/implements/sorted-items/change-from-sorted-item-to-sorted-item.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SortedItemNotFoundException
} from '@/errors';
import { SortedItemModel } from '@/models/sorted-item.model';
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
    private readonly updateSortedItemService: UpdateSortedItemService
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

    const toItem = await this.updateSortedItemService.execute({
      data: {
        item: toSortedItem.item,
        updatedBy: data.updatedBy
      },
      where: {
        app: data.app,
        sortedItem: fromSortedItem.id
      }
    });
    let fromItem: SortedItemModel;
    try {
      fromItem = await this.updateSortedItemService.execute({
        data: {
          item: fromSortedItem.item,
          updatedBy: data.updatedBy
        },
        where: {
          app: data.app,
          sortedItem: toSortedItem.id
        }
      });
    } catch (error) {
      fromItem = await this.updateSortedItemService.execute({
        data: {
          item: fromSortedItem.item,
          updatedBy: data.updatedBy
        },
        where: {
          app: data.app,
          sortedItem: fromSortedItem.id
        }
      });
    }

    if (!fromItem || !toItem) {
      throw new SortedItemNotFoundException();
    }
    return {
      fromItem,
      toItem
    };
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
