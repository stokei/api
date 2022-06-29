import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateOrdersItemCommand } from '@/commands/implements/orders-items/update-orders-item.command';
import {
  DataNotFoundException,
  OrdersItemNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrdersItemByIdRepository } from '@/repositories/orders-items/find-orders-item-by-id';
import { UpdateOrdersItemRepository } from '@/repositories/orders-items/update-orders-item';

type UpdateOrdersItemCommandKeys = keyof UpdateOrdersItemCommand;

@CommandHandler(UpdateOrdersItemCommand)
export class UpdateOrdersItemCommandHandler
  implements ICommandHandler<UpdateOrdersItemCommand>
{
  constructor(
    private readonly findOrdersItemByIdRepository: FindOrdersItemByIdRepository,
    private readonly updateOrdersItemRepository: UpdateOrdersItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateOrdersItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const ordersItemId = splitServiceId(data.where?.ordersItemId)?.id;
    if (!ordersItemId) {
      throw new ParamNotFoundException('ordersItemId');
    }

    const ordersItem = await this.findOrdersItemByIdRepository.execute(
      ordersItemId
    );
    if (!ordersItem) {
      throw new OrdersItemNotFoundException();
    }

    const updated = await this.updateOrdersItemRepository.execute({
      ...data,
      where: {
        ...data.where,
        ordersItemId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const ordersItemUpdated = await this.findOrdersItemByIdRepository.execute(
      ordersItemId
    );
    if (!ordersItemUpdated) {
      throw new OrdersItemNotFoundException();
    }
    const ordersItemModel =
      this.publisher.mergeObjectContext(ordersItemUpdated);
    ordersItemModel.updatedOrdersItem({
      updatedBy: data.data.updatedBy
    });
    ordersItemModel.commit();

    return ordersItemUpdated;
  }

  private clearData(command: UpdateOrdersItemCommand): UpdateOrdersItemCommand {
    return cleanObject({
      where: cleanObject({
        ordersItemId: cleanValue(command?.where?.ordersItemId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
