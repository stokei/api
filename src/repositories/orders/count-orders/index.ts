import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountOrdersDTO } from '@/dtos/orders/count-orders.dto';
import { OrderMapper } from '@/mappers/orders';

@Injectable()
export class CountOrdersRepository
  implements IBaseRepository<CountOrdersDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountOrdersDTO): Promise<number> {
    const orderMapper = new OrderMapper();
    return await this.model.order.count({
      where: orderMapper.toWhereFindAllPrisma(where)
    });
  }
}
