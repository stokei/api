import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountOrderItemsDTO } from '@/dtos/order-items/count-order-items.dto';
import { OrderItemMapper } from '@/mappers/order-items';

@Injectable()
export class CountOrderItemsRepository
  implements IBaseRepository<CountOrderItemsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountOrderItemsDTO): Promise<number> {
    const orderItemMapper = new OrderItemMapper();
    return await this.model.orderItem.count({
      where: orderItemMapper.toWhereFindAllPrisma(where)
    });
  }
}
