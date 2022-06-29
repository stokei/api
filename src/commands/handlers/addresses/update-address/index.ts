import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  splitServiceId
} from '@stokei/nestjs';

import { UpdateAddressCommand } from '@/commands/implements/addresses/update-address.command';
import {
  AddressNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAddressByIdRepository } from '@/repositories/addresses/find-address-by-id';
import { UpdateAddressRepository } from '@/repositories/addresses/update-address';

type UpdateAddressCommandKeys = keyof UpdateAddressCommand;

@CommandHandler(UpdateAddressCommand)
export class UpdateAddressCommandHandler
  implements ICommandHandler<UpdateAddressCommand>
{
  constructor(
    private readonly findAddressByIdRepository: FindAddressByIdRepository,
    private readonly updateAddressRepository: UpdateAddressRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateAddressCommand) {
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

    const updated = await this.updateAddressRepository.execute({
      ...data,
      where: {
        ...data.where,
        addressId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const addressUpdated = await this.findAddressByIdRepository.execute(
      addressId
    );
    if (!addressUpdated) {
      throw new AddressNotFoundException();
    }
    const addressModel = this.publisher.mergeObjectContext(addressUpdated);
    addressModel.updatedAddress();
    addressModel.commit();

    return addressUpdated;
  }

  private clearData(command: UpdateAddressCommand): UpdateAddressCommand {
    return cleanObject({
      where: cleanObject({
        addressId: cleanValue(command?.where?.addressId)
      }),
      data: cleanObject({
        updatedBy: cleanValue(command?.data?.updatedBy),
        default: cleanValueBoolean(command?.data?.default),
        street: cleanValue(command?.data?.street),
        complement: cleanValue(command?.data?.complement),
        number: cleanValue(command?.data?.number),
        city: cleanValue(command?.data?.city),
        country: cleanValue(command?.data?.country),
        state: cleanValue(command?.data?.state),
        postalCode: cleanValue(command?.data?.postalCode)
      })
    });
  }
}
