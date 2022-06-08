import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { OrdersItemMapper } from '@/mappers/orders-items';
import { OrdersItemModel } from '@/models/orders-item.model';

@Injectable()
export class FindOrdersItemByIdRepository
  implements IBaseRepository<string, Promise<OrdersItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<OrdersItemModel> {
    return new OrdersItemMapper().toModel(
      await this.model.ordersItem.findUnique({
        where: { id }
      })
    );
  }
}
