import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateOrderCommand } from '@/commands/implements/orders/update-order.command';
import { UpdateOrderDTO } from '@/dtos/orders/update-order.dto';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class UpdateOrderService
  implements IBaseService<UpdateOrderDTO, Promise<OrderModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateOrderDTO): Promise<OrderModel> {
    return await this.commandBus.execute(new UpdateOrderCommand(data));
  }
}
