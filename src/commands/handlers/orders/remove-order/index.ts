import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveOrderCommand } from '@/commands/implements/orders/remove-order.command';
import {
  OrderNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrderByIdRepository } from '@/repositories/orders/find-order-by-id';
import { RemoveOrderRepository } from '@/repositories/orders/remove-order';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveOrderCommandKeys = keyof RemoveOrderCommand;

@CommandHandler(RemoveOrderCommand)
export class RemoveOrderCommandHandler
  implements ICommandHandler<RemoveOrderCommand>
{
  constructor(
    private readonly findOrderByIdRepository: FindOrderByIdRepository,
    private readonly removeOrderRepository: RemoveOrderRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveOrderCommand) {
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

    const removed = await this.removeOrderRepository.execute({
      where: {
        orderId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const orderModel = this.publisher.mergeObjectContext(order);
    orderModel.removedOrder();
    orderModel.commit();

    return order;
  }

  private clearData(command: RemoveOrderCommand): RemoveOrderCommand {
    return cleanObject({
      where: cleanObject({
        orderId: cleanValue(command?.where?.orderId)
      })
    });
  }
}
