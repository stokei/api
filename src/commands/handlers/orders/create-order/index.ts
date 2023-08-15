import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateOrderCommand } from '@/commands/implements/orders/create-order.command';
import { OrderStatus } from '@/enums/order-status.enum';
import { APPLICATION_FEE_PERCENT } from '@/environments';
import {
  DataNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateOrderRepository } from '@/repositories/orders/create-order';
import { getFeeAmount } from '@/utils/get-fee-amount';

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

    const orderCreated = await this.createOrderRepository.execute({
      ...data,
      feeAmount: getFeeAmount({
        amount: data.totalAmount,
        feePercentage: APPLICATION_FEE_PERCENT
      }),
      status: OrderStatus.PENDING,
      active: true
    });
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
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      currency: cleanValue(command?.currency),
      paidAmount: cleanValueNumber(command?.paidAmount),
      totalAmount: cleanValueNumber(command?.totalAmount),
      subtotalAmount: cleanValueNumber(command?.subtotalAmount),
      parent: cleanValue(command?.parent)
    });
  }
}
