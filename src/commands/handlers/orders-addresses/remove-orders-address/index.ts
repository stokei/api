import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveOrdersAddressCommand } from '@/commands/implements/orders-addresses/remove-orders-address.command';
import {
  OrdersAddressNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrdersAddressByIdRepository } from '@/repositories/orders-addresses/find-orders-address-by-id';
import { RemoveOrdersAddressRepository } from '@/repositories/orders-addresses/remove-orders-address';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveOrdersAddressCommandKeys = keyof RemoveOrdersAddressCommand;

@CommandHandler(RemoveOrdersAddressCommand)
export class RemoveOrdersAddressCommandHandler
  implements ICommandHandler<RemoveOrdersAddressCommand>
{
  constructor(
    private readonly findOrdersAddressByIdRepository: FindOrdersAddressByIdRepository,
    private readonly removeOrdersAddressRepository: RemoveOrdersAddressRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveOrdersAddressCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const ordersAddressId = splitServiceId(data.where?.ordersAddressId)?.id;
    if (!ordersAddressId) {
      throw new ParamNotFoundException('ordersAddressId');
    }

    const ordersAddress = await this.findOrdersAddressByIdRepository.execute(
      ordersAddressId
    );
    if (!ordersAddress) {
      throw new OrdersAddressNotFoundException();
    }

    const removed = await this.removeOrdersAddressRepository.execute({
      where: {
        ordersAddressId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const ordersAddressModel = this.publisher.mergeObjectContext(ordersAddress);
    ordersAddressModel.removedOrdersAddress();
    ordersAddressModel.commit();

    return ordersAddress;
  }

  private clearData(
    command: RemoveOrdersAddressCommand
  ): RemoveOrdersAddressCommand {
    return cleanObject({
      where: cleanObject({
        ordersAddressId: cleanValue(command?.where?.ordersAddressId)
      })
    });
  }
}
