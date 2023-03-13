import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllSortedItemsDTO } from '@/dtos/sorted-items/find-all-sorted-items.dto';
import { SortedItemMapper } from '@/mappers/sorted-items';
import { SortedItemModel } from '@/models/sorted-item.model';

@Injectable()
export class FindAllSortedItemsRepository
  implements IBaseRepository<FindAllSortedItemsDTO, Promise<SortedItemModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllSortedItemsDTO): Promise<SortedItemModel[]> {
    const sortedItemMapper = new SortedItemMapper();
    return sortedItemMapper.toModels(
      await this.model.sortedItem.findMany(
        sortedItemMapper.toFindAllPrisma(data)
      )
    );
  }
}
