import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllOrdersDTO } from '@/dtos/orders/find-all-orders.dto';
import { OrderMapper } from '@/mappers/orders';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class FindAllOrdersRepository
  implements IBaseRepository<FindAllOrdersDTO, Promise<OrderModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllOrdersDTO): Promise<OrderModel[]> {
    const orderMapper = new OrderMapper();
    return orderMapper.toModels(
      await this.model.order.findMany(orderMapper.toFindAllPrisma(data))
    );
  }
}
