import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveSortedItemDTO } from '@/dtos/sorted-items/remove-sorted-item.dto';

@Injectable()
export class RemoveSortedItemRepository
  implements IBaseRepository<RemoveSortedItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveSortedItemDTO): Promise<boolean> {
    const removed = await this.model.sortedItem.deleteMany({
      where: {
        id: where?.sortedItem,
        app: where?.app
      }
    });
    return removed?.count > 0;
  }
}
