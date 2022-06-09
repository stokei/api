import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateOrdersItemDTO } from '@/dtos/orders-items/create-orders-item.dto';
import { OrdersItemMapper } from '@/mappers/orders-items';
import { OrdersItemModel } from '@/models/orders-item.model';

@Injectable()
export class CreateOrdersItemRepository
  implements IBaseRepository<CreateOrdersItemDTO, Promise<OrdersItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateOrdersItemDTO): Promise<OrdersItemModel> {
    return new OrdersItemMapper().toModel(
      await this.model.ordersItem.create({ data })
    );
  }
}
