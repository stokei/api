import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateOrdersAddressCommand } from '@/commands/implements/orders-addresses/create-orders-address.command';
import { CreateOrdersAddressDTO } from '@/dtos/orders-addresses/create-orders-address.dto';
import { OrdersAddressModel } from '@/models/orders-address.model';

@Injectable()
export class CreateOrdersAddressService
  implements IBaseService<CreateOrdersAddressDTO, Promise<OrdersAddressModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateOrdersAddressDTO): Promise<OrdersAddressModel> {
    return await this.commandBus.execute(new CreateOrdersAddressCommand(data));
  }
}
