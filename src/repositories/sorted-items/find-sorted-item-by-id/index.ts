import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { SortedItemMapper } from '@/mappers/sorted-items';
import { SortedItemModel } from '@/models/sorted-item.model';

@Injectable()
export class FindSortedItemByIdRepository
  implements IBaseRepository<string, Promise<SortedItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<SortedItemModel> {
    return new SortedItemMapper().toModel(
      await this.model.sortedItem.findUnique({
        where: { id }
      })
    );
  }
}
