import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateOrderItemCommand } from '@/commands/implements/order-items/create-order-item.command';
import {
  DataNotFoundException,
  OrderItemNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateOrderItemRepository } from '@/repositories/order-items/create-order-item';

type CreateOrderItemCommandKeys = keyof CreateOrderItemCommand;

@CommandHandler(CreateOrderItemCommand)
export class CreateOrderItemCommandHandler
  implements ICommandHandler<CreateOrderItemCommand>
{
  constructor(
    private readonly createOrderItemRepository: CreateOrderItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrderItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateOrderItemCommandKeys>('parent');
    }

    const orderItemCreated = await this.createOrderItemRepository.execute(data);
    if (!orderItemCreated) {
      throw new OrderItemNotFoundException();
    }
    const orderItemModel = this.publisher.mergeObjectContext(orderItemCreated);
    orderItemModel.createdOrderItem({
      createdBy: data.createdBy
    });
    orderItemModel.commit();

    return orderItemCreated;
  }

  private clearData(command: CreateOrderItemCommand): CreateOrderItemCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
