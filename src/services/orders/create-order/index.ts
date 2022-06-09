import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateOrderCommand } from '@/commands/implements/orders/create-order.command';
import { CreateOrderDTO } from '@/dtos/orders/create-order.dto';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class CreateOrderService
  implements IBaseService<CreateOrderDTO, Promise<OrderModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateOrderDTO): Promise<OrderModel> {
    return await this.commandBus.execute(new CreateOrderCommand(data));
  }
}
