import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateOrderCommand } from '@/commands/implements/orders/update-order.command';
import {
  DataNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrderByIdRepository } from '@/repositories/orders/find-order-by-id';
import { UpdateOrderRepository } from '@/repositories/orders/update-order';

type UpdateOrderCommandKeys = keyof UpdateOrderCommand;

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderCommandHandler
  implements ICommandHandler<UpdateOrderCommand>
{
  constructor(
    private readonly findOrderByIdRepository: FindOrderByIdRepository,
    private readonly updateOrderRepository: UpdateOrderRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateOrderCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const orderId = splitServiceId(data.where?.orderId)?.id;
    if (!orderId) {
      throw new ParamNotFoundException('orderId');
    }

    const order = await this.findOrderByIdRepository.execute(orderId);
    if (!order) {
      throw new OrderNotFoundException();
    }

    const updated = await this.updateOrderRepository.execute({
      ...data,
      where: {
        ...data.where,
        orderId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const orderUpdated = await this.findOrderByIdRepository.execute(orderId);
    if (!orderUpdated) {
      throw new OrderNotFoundException();
    }
    const orderModel = this.publisher.mergeObjectContext(orderUpdated);
    orderModel.updatedOrder();
    orderModel.commit();

    return orderUpdated;
  }

  private clearData(command: UpdateOrderCommand): UpdateOrderCommand {
    return cleanObject({
      where: cleanObject({
        orderId: cleanValue(command?.where?.orderId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
