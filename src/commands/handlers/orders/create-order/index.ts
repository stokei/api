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
    if (!data?.app) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('app');
    }
    if (!data?.cart) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('cart');
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('customer');
    }

    const orderCreated = await this.createOrderRepository.execute(data);
    if (!orderCreated) {
      throw new OrderNotFoundException();
    }
    const orderModel = this.publisher.mergeObjectContext(orderCreated);
    orderModel.createdOrder({
      createdBy: data.createdBy
    });
    orderModel.commit();

    return orderCreated;
  }

  private clearData(command: CreateOrderCommand): CreateOrderCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      cart: cleanValue(command?.cart),
      customer: cleanValue(command?.customer),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
