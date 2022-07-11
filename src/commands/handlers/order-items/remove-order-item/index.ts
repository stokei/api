import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveOrderItemCommand } from '@/commands/implements/order-items/remove-order-item.command';
import {
  DataNotFoundException,
  OrderItemNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrderItemByIdRepository } from '@/repositories/order-items/find-order-item-by-id';
import { RemoveOrderItemRepository } from '@/repositories/order-items/remove-order-item';

type RemoveOrderItemCommandKeys = keyof RemoveOrderItemCommand;

@CommandHandler(RemoveOrderItemCommand)
export class RemoveOrderItemCommandHandler
  implements ICommandHandler<RemoveOrderItemCommand>
{
  constructor(
    private readonly findOrderItemByIdRepository: FindOrderItemByIdRepository,
    private readonly removeOrderItemRepository: RemoveOrderItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveOrderItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const orderItemId = splitServiceId(data.where?.orderItemId)?.id;
    if (!orderItemId) {
      throw new ParamNotFoundException('orderItemId');
    }

    const orderItem = await this.findOrderItemByIdRepository.execute(
      orderItemId
    );
    if (!orderItem) {
      throw new OrderItemNotFoundException();
    }

    const removed = await this.removeOrderItemRepository.execute({
      where: {
        ...data.where,
        orderItemId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const orderItemModel = this.publisher.mergeObjectContext(orderItem);
    orderItemModel.removedOrderItem({
      removedBy: data.where.removedBy
    });
    orderItemModel.commit();

    return orderItem;
  }

  private clearData(command: RemoveOrderItemCommand): RemoveOrderItemCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        orderItemId: cleanValue(command?.where?.orderItemId)
      })
    });
  }
}
