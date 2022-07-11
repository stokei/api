import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveOrderItemDTO } from '@/dtos/order-items/remove-order-item.dto';

@Injectable()
export class RemoveOrderItemRepository
  implements IBaseRepository<RemoveOrderItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveOrderItemDTO): Promise<boolean> {
    const removed = await this.model.orderItem.delete({
      where: {
        id: where?.orderItemId
      }
    });
    return !!removed;
  }
}
