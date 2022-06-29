import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueBoolean } from '@stokei/nestjs';

import { CreateAddressCommand } from '@/commands/implements/addresses/create-address.command';
import {
  AddressNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateAddressRepository } from '@/repositories/addresses/create-address';

type CreateAddressCommandKeys = keyof CreateAddressCommand;

@CommandHandler(CreateAddressCommand)
export class CreateAddressCommandHandler
  implements ICommandHandler<CreateAddressCommand>
{
  constructor(
    private readonly createAddressRepository: CreateAddressRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateAddressCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateAddressCommandKeys>('parent');
    }
    if (!data?.street) {
      throw new ParamNotFoundException<CreateAddressCommandKeys>('street');
    }
    if (!data?.number) {
      throw new ParamNotFoundException<CreateAddressCommandKeys>('number');
    }
    if (!data?.city) {
      throw new ParamNotFoundException<CreateAddressCommandKeys>('city');
    }
    if (!data?.country) {
      throw new ParamNotFoundException<CreateAddressCommandKeys>('country');
    }
    if (!data?.state) {
      throw new ParamNotFoundException<CreateAddressCommandKeys>('state');
    }
    if (!data?.postalCode) {
      throw new ParamNotFoundException<CreateAddressCommandKeys>('postalCode');
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreateAddressCommandKeys>('createdBy');
    }

    const addressCreated = await this.createAddressRepository.execute(data);
    if (!addressCreated) {
      throw new AddressNotFoundException();
    }
    const addressModel = this.publisher.mergeObjectContext(addressCreated);
    addressModel.createdAddress();
    addressModel.commit();

    return addressCreated;
  }

  private clearData(command: CreateAddressCommand): CreateAddressCommand {
    return cleanObject({
      parent: cleanValue(command?.parent),
      default: cleanValueBoolean(command?.default),
      street: cleanValue(command?.street),
      complement: cleanValue(command?.complement),
      number: cleanValue(command?.number),
      city: cleanValue(command?.city),
      country: cleanValue(command?.country),
      state: cleanValue(command?.state),
      postalCode: cleanValue(command?.postalCode),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
