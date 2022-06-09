import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateAddressCommand } from '@/commands/implements/addresses/update-address.command';
import { UpdateAddressDTO } from '@/dtos/addresses/update-address.dto';
import { AddressModel } from '@/models/address.model';

@Injectable()
export class UpdateAddressService
  implements IBaseService<UpdateAddressDTO, Promise<AddressModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateAddressDTO): Promise<AddressModel> {
    return await this.commandBus.execute(new UpdateAddressCommand(data));
  }
}
