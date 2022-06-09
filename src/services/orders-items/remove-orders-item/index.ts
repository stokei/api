import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveOrdersItemCommand } from '@/commands/implements/orders-items/remove-orders-item.command';
import { RemoveOrdersItemDTO } from '@/dtos/orders-items/remove-orders-item.dto';
import { OrdersItemModel } from '@/models/orders-item.model';

@Injectable()
export class RemoveOrdersItemService
  implements IBaseService<RemoveOrdersItemDTO, Promise<OrdersItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveOrdersItemDTO): Promise<OrdersItemModel> {
    return await this.commandBus.execute(new RemoveOrdersItemCommand(data));
  }
}
