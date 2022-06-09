import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

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
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
