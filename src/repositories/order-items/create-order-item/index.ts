import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateOrderItemRepositoryDTO } from '@/dtos/order-items/create-order-item-repository.dto';
import { OrderItemMapper } from '@/mappers/order-items';
import { OrderItemModel } from '@/models/order-item.model';

@Injectable()
export class CreateOrderItemRepository
  implements
    IBaseRepository<CreateOrderItemRepositoryDTO, Promise<OrderItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateOrderItemRepositoryDTO): Promise<OrderItemModel> {
    return new OrderItemMapper().toModel(
      await this.model.orderItem.create({ data })
    );
  }
}
