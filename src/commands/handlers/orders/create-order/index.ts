import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateOrderCommand } from '@/commands/implements/orders/create-order.command';
import {
  DataNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateOrderRepository } from '@/repositories/orders/create-order';

type CreateOrderCommandKeys = keyof CreateOrderCommand;

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    private readonly createOrderRepository: CreateOrderRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrderCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('parent');
    }

    const orderCreated = await this.createOrderRepository.execute(data);
    if (!orderCreated) {
      throw new OrderNotFoundException();
    }
    const orderModel = this.publisher.mergeObjectContext(orderCreated);
    orderModel.createdOrder();
    orderModel.commit();

    return orderCreated;
  }

  private clearData(command: CreateOrderCommand): CreateOrderCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
