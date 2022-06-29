import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateOrdersItemCommand } from '@/commands/implements/orders-items/create-orders-item.command';
import {
  DataNotFoundException,
  OrdersItemNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateOrdersItemRepository } from '@/repositories/orders-items/create-orders-item';

type CreateOrdersItemCommandKeys = keyof CreateOrdersItemCommand;

@CommandHandler(CreateOrdersItemCommand)
export class CreateOrdersItemCommandHandler
  implements ICommandHandler<CreateOrdersItemCommand>
{
  constructor(
    private readonly createOrdersItemRepository: CreateOrdersItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrdersItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateOrdersItemCommandKeys>('parent');
    }

    const ordersItemCreated = await this.createOrdersItemRepository.execute(
      data
    );
    if (!ordersItemCreated) {
      throw new OrdersItemNotFoundException();
    }
    const ordersItemModel =
      this.publisher.mergeObjectContext(ordersItemCreated);
    ordersItemModel.createdOrdersItem({
      createdBy: data.createdBy
    });
    ordersItemModel.commit();

    return ordersItemCreated;
  }

  private clearData(command: CreateOrdersItemCommand): CreateOrdersItemCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
