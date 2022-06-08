import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveOrdersItemCommand } from '@/commands/implements/orders-items/remove-orders-item.command';
import {
  OrdersItemNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrdersItemByIdRepository } from '@/repositories/orders-items/find-orders-item-by-id';
import { RemoveOrdersItemRepository } from '@/repositories/orders-items/remove-orders-item';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveOrdersItemCommandKeys = keyof RemoveOrdersItemCommand;

@CommandHandler(RemoveOrdersItemCommand)
export class RemoveOrdersItemCommandHandler
  implements ICommandHandler<RemoveOrdersItemCommand>
{
  constructor(
    private readonly findOrdersItemByIdRepository: FindOrdersItemByIdRepository,
    private readonly removeOrdersItemRepository: RemoveOrdersItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveOrdersItemCommand) {
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

    const removed = await this.removeOrdersItemRepository.execute({
      where: {
        ordersItemId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const ordersItemModel = this.publisher.mergeObjectContext(ordersItem);
    ordersItemModel.removedOrdersItem();
    ordersItemModel.commit();

    return ordersItem;
  }

  private clearData(command: RemoveOrdersItemCommand): RemoveOrdersItemCommand {
    return cleanObject({
      where: cleanObject({
        ordersItemId: cleanValue(command?.where?.ordersItemId)
      })
    });
  }
}
