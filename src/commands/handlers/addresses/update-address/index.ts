import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAddressCommand } from '@/commands/implements/addresses/update-address.command';
import {
  AddressNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAddressByIdRepository } from '@/repositories/addresses/find-address-by-id';
import { UpdateAddressRepository } from '@/repositories/addresses/update-address';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

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
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
