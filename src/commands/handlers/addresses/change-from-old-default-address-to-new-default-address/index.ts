import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  splitServiceId
} from '@stokei/nestjs';

import { ChangeFromOldDefaultAddressToNewDefaultAddressCommand } from '@/commands/implements/addresses/change-from-old-default-address-to-new-default-address.command';
import {
  AddressNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAddressByIdRepository } from '@/repositories/addresses/find-address-by-id';
import { FindAllAddressesRepository } from '@/repositories/addresses/find-all-addresses';
import { UpdateAddressRepository } from '@/repositories/addresses/update-address';

@CommandHandler(ChangeFromOldDefaultAddressToNewDefaultAddressCommand)
export class ChangeFromOldDefaultAddressToNewDefaultAddressCommandHandler
  implements
    ICommandHandler<ChangeFromOldDefaultAddressToNewDefaultAddressCommand>
{
  constructor(
    private readonly findAddressByIdRepository: FindAddressByIdRepository,
    private readonly findAllAddressesRepository: FindAllAddressesRepository,
    private readonly updateAddressRepository: UpdateAddressRepository
  ) {}

  async execute(
    command: ChangeFromOldDefaultAddressToNewDefaultAddressCommand
  ) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.updatedBy) {
      throw new ParamNotFoundException('updatedBy');
    }
    const newAddressId = splitServiceId(data.newAddress)?.id;
    if (!newAddressId) {
      throw new ParamNotFoundException('newAddressId');
    }

    const newAddress = await this.findAddressByIdRepository.execute(
      newAddressId
    );
    if (!newAddress) {
      throw new AddressNotFoundException();
    }

    const allAddresses = await this.findAllAddressesRepository.execute({
      where: {
        AND: {
          parent: {
            equals: newAddress.parent
          },
          default: {
            equals: true
          }
        },
        NOT: {
          ids: [newAddressId]
        }
      }
    });
    if (allAddresses?.length > 0) {
      await Promise.all(
        allAddresses.map((address) =>
          this.updateAddressRepository.execute({
            data: {
              updatedBy: data.updatedBy,
              default: false
            },
            where: {
              addressId: splitServiceId(address.id)?.id
            }
          })
        )
      );
    }
  }

  private clearData(
    command: ChangeFromOldDefaultAddressToNewDefaultAddressCommand
  ): ChangeFromOldDefaultAddressToNewDefaultAddressCommand {
    return cleanObject({
      updatedBy: cleanValue(command?.updatedBy),
      newAddress: cleanValueBoolean(command?.newAddress)
    });
  }
}
