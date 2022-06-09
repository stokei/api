import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveOrderCommand } from '@/commands/implements/orders/remove-order.command';
import { RemoveOrderDTO } from '@/dtos/orders/remove-order.dto';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class RemoveOrderService
  implements IBaseService<RemoveOrderDTO, Promise<OrderModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveOrderDTO): Promise<OrderModel> {
    return await this.commandBus.execute(new RemoveOrderCommand(data));
  }
}
