import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ChangeOrderToPaidCommand } from '@/commands/implements/orders/change-order-to-paid.command';
import { ChangeOrderToPaidDTO } from '@/dtos/orders/change-order-to-paid.dto';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class ChangeOrderToPaidService
  implements IBaseService<ChangeOrderToPaidDTO, Promise<OrderModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ChangeOrderToPaidDTO): Promise<OrderModel> {
    return await this.commandBus.execute(new ChangeOrderToPaidCommand(data));
  }
}
