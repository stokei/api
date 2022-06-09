import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveOrdersItemDTO } from '@/dtos/orders-items/remove-orders-item.dto';

@Injectable()
export class RemoveOrdersItemRepository
  implements IBaseRepository<RemoveOrdersItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveOrdersItemDTO): Promise<boolean> {
    const removed = await this.model.ordersItem.delete({
      where: {
        id: where?.ordersItemId
      }
    });
    return !!removed;
  }
}
