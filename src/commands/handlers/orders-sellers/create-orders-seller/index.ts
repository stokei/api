import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrdersSellerCommand } from '@/commands/implements/orders-sellers/create-orders-seller.command';
import {
  OrdersSellerNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateOrdersSellerRepository } from '@/repositories/orders-sellers/create-orders-seller';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateOrdersSellerCommandKeys = keyof CreateOrdersSellerCommand;

@CommandHandler(CreateOrdersSellerCommand)
export class CreateOrdersSellerCommandHandler
  implements ICommandHandler<CreateOrdersSellerCommand>
{
  constructor(
    private readonly createOrdersSellerRepository: CreateOrdersSellerRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrdersSellerCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateOrdersSellerCommandKeys>('parent');
    }

    const ordersSellerCreated = await this.createOrdersSellerRepository.execute(
      data
    );
    if (!ordersSellerCreated) {
      throw new OrdersSellerNotFoundException();
    }
    const ordersSellerModel =
      this.publisher.mergeObjectContext(ordersSellerCreated);
    ordersSellerModel.createdOrdersSeller();
    ordersSellerModel.commit();

    return ordersSellerCreated;
  }

  private clearData(
    command: CreateOrdersSellerCommand
  ): CreateOrdersSellerCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
