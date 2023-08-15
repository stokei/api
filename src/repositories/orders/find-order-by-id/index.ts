import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { OrderMapper } from '@/mappers/orders';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class FindOrderByIdRepository
  implements IBaseRepository<string, Promise<OrderModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<OrderModel> {
    return new OrderMapper().toModel(
      await this.model.order.findUnique({
        where: { id }
      })
    );
  }
}
