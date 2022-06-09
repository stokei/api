import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateOrdersAddressCommand } from '@/commands/implements/orders-addresses/create-orders-address.command';
import {
  DataNotFoundException,
  OrdersAddressNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateOrdersAddressRepository } from '@/repositories/orders-addresses/create-orders-address';

type CreateOrdersAddressCommandKeys = keyof CreateOrdersAddressCommand;

@CommandHandler(CreateOrdersAddressCommand)
export class CreateOrdersAddressCommandHandler
  implements ICommandHandler<CreateOrdersAddressCommand>
{
  constructor(
    private readonly createOrdersAddressRepository: CreateOrdersAddressRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrdersAddressCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateOrdersAddressCommandKeys>(
        'parent'
      );
    }

    const ordersAddressCreated =
      await this.createOrdersAddressRepository.execute(data);
    if (!ordersAddressCreated) {
      throw new OrdersAddressNotFoundException();
    }
    const ordersAddressModel =
      this.publisher.mergeObjectContext(ordersAddressCreated);
    ordersAddressModel.createdOrdersAddress();
    ordersAddressModel.commit();

    return ordersAddressCreated;
  }

  private clearData(
    command: CreateOrdersAddressCommand
  ): CreateOrdersAddressCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
