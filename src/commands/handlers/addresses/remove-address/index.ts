import { UnauthorizedException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveAddressCommand } from '@/commands/implements/addresses/remove-address.command';
import {
  AddressNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAddressByIdRepository } from '@/repositories/addresses/find-address-by-id';
import { RemoveAddressRepository } from '@/repositories/addresses/remove-address';

@CommandHandler(RemoveAddressCommand)
export class RemoveAddressCommandHandler
  implements ICommandHandler<RemoveAddressCommand>
{
  constructor(
    private readonly findAddressByIdRepository: FindAddressByIdRepository,
    private readonly removeAddressRepository: RemoveAddressRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveAddressCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const addressId = splitServiceId(data.where?.address)?.id;
    if (!addressId) {
      throw new ParamNotFoundException('addressId');
    }

    const address = await this.findAddressByIdRepository.execute(addressId);
    if (!address) {
      throw new AddressNotFoundException();
    }
    if (address.parent !== data.where.removedBy) {
      throw new UnauthorizedException();
    }
    const removed = await this.removeAddressRepository.execute({
      where: {
        ...data.where,
        address: addressId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const addressModel = this.publisher.mergeObjectContext(address);
    addressModel.removedAddress({
      removedBy: data.where.removedBy
    });
    addressModel.commit();

    return address;
  }

  private clearData(command: RemoveAddressCommand): RemoveAddressCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        address: cleanValue(command?.where?.address)
      })
    });
  }
}
