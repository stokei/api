import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateOrdersItemCommand } from '@/commands/implements/orders-items/create-orders-item.command';
import { CreateOrdersItemDTO } from '@/dtos/orders-items/create-orders-item.dto';
import { OrdersItemModel } from '@/models/orders-item.model';

@Injectable()
export class CreateOrdersItemService
  implements IBaseService<CreateOrdersItemDTO, Promise<OrdersItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateOrdersItemDTO): Promise<OrdersItemModel> {
    return await this.commandBus.execute(new CreateOrdersItemCommand(data));
  }
}
