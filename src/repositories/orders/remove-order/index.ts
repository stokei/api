import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveOrderDTO } from '@/dtos/orders/remove-order.dto';

@Injectable()
export class RemoveOrderRepository
  implements IBaseRepository<RemoveOrderDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveOrderDTO): Promise<boolean> {
    const removed = await this.model.order.delete({
      where: {
        id: where?.orderId
      }
    });
    return !!removed;
  }
}
