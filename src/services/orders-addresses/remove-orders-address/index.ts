import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveOrdersAddressCommand } from '@/commands/implements/orders-addresses/remove-orders-address.command';
import { RemoveOrdersAddressDTO } from '@/dtos/orders-addresses/remove-orders-address.dto';
import { OrdersAddressModel } from '@/models/orders-address.model';

@Injectable()
export class RemoveOrdersAddressService
  implements IBaseService<RemoveOrdersAddressDTO, Promise<OrdersAddressModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveOrdersAddressDTO): Promise<OrdersAddressModel> {
    return await this.commandBus.execute(new RemoveOrdersAddressCommand(data));
  }
}
