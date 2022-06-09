import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveOrdersSellerDTO } from '@/dtos/orders-sellers/remove-orders-seller.dto';

@Injectable()
export class RemoveOrdersSellerRepository
  implements IBaseRepository<RemoveOrdersSellerDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveOrdersSellerDTO): Promise<boolean> {
    const removed = await this.model.ordersSeller.delete({
      where: {
        id: where?.ordersSellerId
      }
    });
    return !!removed;
  }
}
