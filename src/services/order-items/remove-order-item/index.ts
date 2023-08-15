import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveOrderItemCommand } from '@/commands/implements/order-items/remove-orderItem.command';
import { RemoveOrderItemDTO } from '@/dtos/order-items/remove-orderItem.dto';
import { OrderItemModel } from '@/models/order-item.model';

@Injectable()
export class RemoveOrderItemService
  implements IBaseService<RemoveOrderItemDTO, Promise<OrderItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveOrderItemDTO): Promise<OrderItemModel> {
    return await this.commandBus.execute(new RemoveOrderItemCommand(data));
  }
}
