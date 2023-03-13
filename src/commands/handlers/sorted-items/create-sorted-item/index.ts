import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateSortedItemCommand } from '@/commands/implements/sorted-items/create-sorted-item.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SortedItemNotFoundException
} from '@/errors';
import { CreateSortedItemRepository } from '@/repositories/sorted-items/create-sorted-item';
import { FindMaxIndexSortedItemService } from '@/services/sorted-items/find-max-index-sorted-item';

type CreateSortedItemCommandKeys = keyof CreateSortedItemCommand;

@CommandHandler(CreateSortedItemCommand)
export class CreateSortedItemCommandHandler
  implements ICommandHandler<CreateSortedItemCommand>
{
  constructor(
    private readonly findMaxIndexSortedItemService: FindMaxIndexSortedItemService,
    private readonly createSortedItemRepository: CreateSortedItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateSortedItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateSortedItemCommandKeys>('parent');
    }
    if (!data?.item) {
      throw new ParamNotFoundException<CreateSortedItemCommandKeys>('item');
    }

    let maxIndex = 1;
    try {
      const maxIndexSortedItem =
        await this.findMaxIndexSortedItemService.execute({
          where: {
            parent: data.parent,
            app: data.app
          }
        });
      maxIndex = maxIndexSortedItem.index;
    } catch (error) {}

    const sortedItemCreated = await this.createSortedItemRepository.execute({
      ...data,
      index: maxIndex + 1
    });
    if (!sortedItemCreated) {
      throw new SortedItemNotFoundException();
    }
    const sortedItemModel =
      this.publisher.mergeObjectContext(sortedItemCreated);
    sortedItemModel.createdSortedItem({
      createdBy: data.createdBy
    });
    sortedItemModel.commit();

    return sortedItemCreated;
  }

  private clearData(command: CreateSortedItemCommand): CreateSortedItemCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      item: cleanValue(command?.item)
    });
  }
}
