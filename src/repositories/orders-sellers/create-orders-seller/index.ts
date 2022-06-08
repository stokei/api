import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { OrdersSellerMapper } from '@/mappers/orders-sellers';
import { CreateOrdersSellerDTO } from '@/dtos/orders-sellers/create-orders-seller.dto';
import { OrdersSellerModel } from '@/models/orders-seller.model';

@Injectable()
export class CreateOrdersSellerRepository
  implements IBaseRepository<CreateOrdersSellerDTO, Promise<OrdersSellerModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateOrdersSellerDTO): Promise<OrdersSellerModel> {
    return new OrdersSellerMapper().toModel(
      await this.model.ordersSeller.create({ data })
    );
  }
}
