import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateOrderItemCommand } from '@/commands/implements/order-items/create-orderItem.command';
import { CreateOrderItemDTO } from '@/dtos/order-items/create-orderItem.dto';
import { OrderItemModel } from '@/models/order-item.model';

@Injectable()
export class CreateOrderItemService
  implements IBaseService<CreateOrderItemDTO, Promise<OrderItemModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateOrderItemDTO): Promise<OrderItemModel> {
    return await this.commandBus.execute(new CreateOrderItemCommand(data));
  }
}
