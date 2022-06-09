import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateOrdersSellerDTO } from '@/dtos/orders-sellers/update-orders-seller.dto';

@Injectable()
export class UpdateOrdersSellerRepository
  implements IBaseRepository<UpdateOrdersSellerDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateOrdersSellerDTO): Promise<boolean> {
    const updated = await this.model.ordersSeller.update({
      where: {
        id: where?.ordersSellerId
      },
      data
    });
    return !!updated;
  }
}
