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

type RemoveAddressCommandKeys = keyof RemoveAddressCommand;

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
    const addressId = splitServiceId(data.where?.addressId)?.id;
    if (!addressId) {
      throw new ParamNotFoundException('addressId');
    }

    const address = await this.findAddressByIdRepository.execute(addressId);
    if (!address) {
      throw new AddressNotFoundException();
    }

    const removed = await this.removeAddressRepository.execute({
      where: {
        addressId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const addressModel = this.publisher.mergeObjectContext(address);
    addressModel.removedAddress();
    addressModel.commit();

    return address;
  }

  private clearData(command: RemoveAddressCommand): RemoveAddressCommand {
    return cleanObject({
      where: cleanObject({
        addressId: cleanValue(command?.where?.addressId)
      })
    });
  }
}
