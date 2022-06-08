import { RemoveAddressCommand } from '@/commands/implements/addresses/remove-address.command';
import { RemoveAddressDTO } from '@/dtos/addresses/remove-address.dto';
import { AddressModel } from '@/models/address.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveAddressService
  implements IBaseService<RemoveAddressDTO, Promise<AddressModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveAddressDTO): Promise<AddressModel> {
    return await this.commandBus.execute(new RemoveAddressCommand(data));
  }
}
