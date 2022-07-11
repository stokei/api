import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { OrderItemMapper } from '@/mappers/order-items';
import { OrderItemModel } from '@/models/order-item.model';

@Injectable()
export class FindOrderItemByIdRepository
  implements IBaseRepository<string, Promise<OrderItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<OrderItemModel> {
    return new OrderItemMapper().toModel(
      await this.model.orderItem.findUnique({
        where: { id }
      })
    );
  }
}
