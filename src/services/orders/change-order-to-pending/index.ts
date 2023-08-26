import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ChangeOrderToPendingCommand } from '@/commands/implements/orders/change-order-to-pending.command';
import { ChangeOrderToPendingDTO } from '@/dtos/orders/change-order-to-pending.dto';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class ChangeOrderToPendingService
  implements IBaseService<ChangeOrderToPendingDTO, Promise<OrderModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ChangeOrderToPendingDTO): Promise<OrderModel> {
    return await this.commandBus.execute(new ChangeOrderToPendingCommand(data));
  }
}
