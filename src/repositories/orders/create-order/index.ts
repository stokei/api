import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateOrderDTO } from '@/dtos/orders/create-order.dto';
import { OrderMapper } from '@/mappers/orders';
import { OrderModel } from '@/models/order.model';

@Injectable()
export class CreateOrderRepository
  implements IBaseRepository<CreateOrderDTO, Promise<OrderModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateOrderDTO): Promise<OrderModel> {
    return new OrderMapper().toModel(await this.model.order.create({ data }));
  }
}
