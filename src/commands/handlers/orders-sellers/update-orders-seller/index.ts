import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateOrdersSellerCommand } from '@/commands/implements/orders-sellers/update-orders-seller.command';
import {
  DataNotFoundException,
  OrdersSellerNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrdersSellerByIdRepository } from '@/repositories/orders-sellers/find-orders-seller-by-id';
import { UpdateOrdersSellerRepository } from '@/repositories/orders-sellers/update-orders-seller';

type UpdateOrdersSellerCommandKeys = keyof UpdateOrdersSellerCommand;

@CommandHandler(UpdateOrdersSellerCommand)
export class UpdateOrdersSellerCommandHandler
  implements ICommandHandler<UpdateOrdersSellerCommand>
{
  constructor(
    private readonly findOrdersSellerByIdRepository: FindOrdersSellerByIdRepository,
    private readonly updateOrdersSellerRepository: UpdateOrdersSellerRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateOrdersSellerCommand) {
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

    const updated = await this.updateOrdersSellerRepository.execute({
      ...data,
      where: {
        ...data.where,
        ordersSellerId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const ordersSellerUpdated =
      await this.findOrdersSellerByIdRepository.execute(ordersSellerId);
    if (!ordersSellerUpdated) {
      throw new OrdersSellerNotFoundException();
    }
    const ordersSellerModel =
      this.publisher.mergeObjectContext(ordersSellerUpdated);
    ordersSellerModel.updatedOrdersSeller();
    ordersSellerModel.commit();

    return ordersSellerUpdated;
  }

  private clearData(
    command: UpdateOrdersSellerCommand
  ): UpdateOrdersSellerCommand {
    return cleanObject({
      where: cleanObject({
        ordersSellerId: cleanValue(command?.where?.ordersSellerId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
