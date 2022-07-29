import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateOrderRepositoryDTO } from '@/dtos/orders/create-order-repository.dto';
import { OrderMapper } from '@/mappers/orders';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class CreateOrderRepository
  implements IBaseRepository<CreateOrderRepositoryDTO, Promise<OrderModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateOrderRepositoryDTO): Promise<OrderModel> {
    return new OrderMapper().toModel(await this.model.order.create({ data }));
  }
}
