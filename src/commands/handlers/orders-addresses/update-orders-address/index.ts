import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateOrdersAddressCommand } from '@/commands/implements/orders-addresses/update-orders-address.command';
import {
  OrdersAddressNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindOrdersAddressByIdRepository } from '@/repositories/orders-addresses/find-orders-address-by-id';
import { UpdateOrdersAddressRepository } from '@/repositories/orders-addresses/update-orders-address';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateOrdersAddressCommandKeys = keyof UpdateOrdersAddressCommand;

@CommandHandler(UpdateOrdersAddressCommand)
export class UpdateOrdersAddressCommandHandler
  implements ICommandHandler<UpdateOrdersAddressCommand>
{
  constructor(
    private readonly findOrdersAddressByIdRepository: FindOrdersAddressByIdRepository,
    private readonly updateOrdersAddressRepository: UpdateOrdersAddressRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateOrdersAddressCommand) {
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

    const updated = await this.updateOrdersAddressRepository.execute({
      ...data,
      where: {
        ...data.where,
        ordersAddressId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const ordersAddressUpdated =
      await this.findOrdersAddressByIdRepository.execute(ordersAddressId);
    if (!ordersAddressUpdated) {
      throw new OrdersAddressNotFoundException();
    }
    const ordersAddressModel =
      this.publisher.mergeObjectContext(ordersAddressUpdated);
    ordersAddressModel.updatedOrdersAddress();
    ordersAddressModel.commit();

    return ordersAddressUpdated;
  }

  private clearData(
    command: UpdateOrdersAddressCommand
  ): UpdateOrdersAddressCommand {
    return cleanObject({
      where: cleanObject({
        ordersAddressId: cleanValue(command?.where?.ordersAddressId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
