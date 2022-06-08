import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { OrdersItemMapper } from '@/mappers/orders-items';
import { CreateOrdersItemDTO } from '@/dtos/orders-items/create-orders-item.dto';
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
