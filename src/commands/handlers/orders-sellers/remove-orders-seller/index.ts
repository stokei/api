import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveOrdersSellerCommand } from '@/commands/implements/orders-sellers/remove-orders-seller.command';
import {
  OrdersSellerNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrdersSellerByIdRepository } from '@/repositories/orders-sellers/find-orders-seller-by-id';
import { RemoveOrdersSellerRepository } from '@/repositories/orders-sellers/remove-orders-seller';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveOrdersSellerCommandKeys = keyof RemoveOrdersSellerCommand;

@CommandHandler(RemoveOrdersSellerCommand)
export class RemoveOrdersSellerCommandHandler
  implements ICommandHandler<RemoveOrdersSellerCommand>
{
  constructor(
    private readonly findOrdersSellerByIdRepository: FindOrdersSellerByIdRepository,
    private readonly removeOrdersSellerRepository: RemoveOrdersSellerRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveOrdersSellerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const ordersSellerId = splitServiceId(data.where?.ordersSellerId)?.id;
    if (!ordersSellerId) {
      throw new ParamNotFoundException('ordersSellerId');
    }

    const ordersSeller = await this.findOrdersSellerByIdRepository.execute(
      ordersSellerId
    );
    if (!ordersSeller) {
      throw new OrdersSellerNotFoundException();
    }

    const removed = await this.removeOrdersSellerRepository.execute({
      where: {
        ordersSellerId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const ordersSellerModel = this.publisher.mergeObjectContext(ordersSeller);
    ordersSellerModel.removedOrdersSeller();
    ordersSellerModel.commit();

    return ordersSeller;
  }

  private clearData(
    command: RemoveOrdersSellerCommand
  ): RemoveOrdersSellerCommand {
    return cleanObject({
      where: cleanObject({
        ordersSellerId: cleanValue(command?.where?.ordersSellerId)
      })
    });
  }
}
