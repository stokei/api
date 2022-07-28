import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllOrderItemsDTO } from '@/dtos/order-items/find-all-order-items.dto';
import { OrderItemMapper } from '@/mappers/order-items';
import { OrderItemModel } from '@/models/order-item.model';

@Injectable()
export class FindAllOrderItemsRepository
  implements IBaseRepository<FindAllOrderItemsDTO, Promise<OrderItemModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllOrderItemsDTO): Promise<OrderItemModel[]> {
    const orderItemMapper = new OrderItemMapper();
    return orderItemMapper.toModels(
      await this.model.orderItem.findMany(orderItemMapper.toFindAllPrisma(data))
    );
  }
}
