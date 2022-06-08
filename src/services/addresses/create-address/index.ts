import { CreateAddressCommand } from '@/commands/implements/addresses/create-address.command';
import { CreateAddressDTO } from '@/dtos/addresses/create-address.dto';
import { AddressModel } from '@/models/address.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateAddressService
  implements IBaseService<CreateAddressDTO, Promise<AddressModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAddressDTO): Promise<AddressModel> {
    return await this.commandBus.execute(new CreateAddressCommand(data));
  }
}
