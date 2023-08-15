import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateOrderItemCommand } from '@/commands/implements/order-items/update-orderItem.command';
import { UpdateOrderItemDTO } from '@/dtos/order-items/update-orderItem.dto';
import { OrderItemModel } from '@/models/order-item.model';

@Injectable()
export class UpdateOrderItemService
  implements IBaseService<UpdateOrderItemDTO, Promise<OrderItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateOrderItemDTO): Promise<OrderItemModel> {
    return await this.commandBus.execute(new UpdateOrderItemCommand(data));
  }
}
