import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateOrderItemCommand } from '@/commands/implements/order-items/update-order-item.command';
import {
  DataNotFoundException,
  OrderItemNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrderItemByIdRepository } from '@/repositories/order-items/find-order-item-by-id';
import { UpdateOrderItemRepository } from '@/repositories/order-items/update-order-item';

type UpdateOrderItemCommandKeys = keyof UpdateOrderItemCommand;

@CommandHandler(UpdateOrderItemCommand)
export class UpdateOrderItemCommandHandler
  implements ICommandHandler<UpdateOrderItemCommand>
{
  constructor(
    private readonly findOrderItemByIdRepository: FindOrderItemByIdRepository,
    private readonly updateOrderItemRepository: UpdateOrderItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateOrderItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
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

    const updated = await this.updateOrderItemRepository.execute({
      ...data,
      where: {
        ...data.where,
        orderItemId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const orderItemUpdated = await this.findOrderItemByIdRepository.execute(
      orderItemId
    );
    if (!orderItemUpdated) {
      throw new OrderItemNotFoundException();
    }
    const orderItemModel = this.publisher.mergeObjectContext(orderItemUpdated);
    orderItemModel.updatedOrderItem({
      updatedBy: data.data.updatedBy
    });
    orderItemModel.commit();

    return orderItemUpdated;
  }

  private clearData(command: UpdateOrderItemCommand): UpdateOrderItemCommand {
    return cleanObject({
      where: cleanObject({
        orderItemId: cleanValue(command?.where?.orderItemId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
