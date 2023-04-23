import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountSortedItemsDTO } from '@/dtos/sorted-items/count-sorted-items.dto';
import { SortedItemMapper } from '@/mappers/sorted-items';

@Injectable()
export class CountSortedItemsRepository
  implements IBaseRepository<CountSortedItemsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountSortedItemsDTO): Promise<number> {
    const sortedItemMapper = new SortedItemMapper();
    return await this.model.sortedItem.count({
      where: sortedItemMapper.toWhereFindAllPrisma(where)
    });
  }
}
