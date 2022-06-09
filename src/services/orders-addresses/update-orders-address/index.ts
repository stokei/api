import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateOrdersAddressCommand } from '@/commands/implements/orders-addresses/update-orders-address.command';
import { UpdateOrdersAddressDTO } from '@/dtos/orders-addresses/update-orders-address.dto';
import { OrdersAddressModel } from '@/models/orders-address.model';

@Injectable()
export class UpdateOrdersAddressService
  implements IBaseService<UpdateOrdersAddressDTO, Promise<OrdersAddressModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateOrdersAddressDTO): Promise<OrdersAddressModel> {
    return await this.commandBus.execute(new UpdateOrdersAddressCommand(data));
  }
}
