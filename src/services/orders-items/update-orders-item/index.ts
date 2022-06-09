import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateOrdersItemCommand } from '@/commands/implements/orders-items/update-orders-item.command';
import { UpdateOrdersItemDTO } from '@/dtos/orders-items/update-orders-item.dto';
import { OrdersItemModel } from '@/models/orders-item.model';

@Injectable()
export class UpdateOrdersItemService
  implements IBaseService<UpdateOrdersItemDTO, Promise<OrdersItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateOrdersItemDTO): Promise<OrdersItemModel> {
    return await this.commandBus.execute(new UpdateOrdersItemCommand(data));
  }
}
