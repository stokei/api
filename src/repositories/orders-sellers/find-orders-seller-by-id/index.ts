import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { OrdersSellerMapper } from '@/mappers/orders-sellers';
import { OrdersSellerModel } from '@/models/orders-seller.model';

@Injectable()
export class FindOrdersSellerByIdRepository
  implements IBaseRepository<string, Promise<OrdersSellerModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<OrdersSellerModel> {
    return new OrdersSellerMapper().toModel(
      await this.model.ordersSeller.findUnique({
        where: { id }
      })
    );
  }
}
