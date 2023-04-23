import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindMaxIndexSortedItemDTO } from '@/dtos/sorted-items/find-max-index-sorted-item.dto';
import { SortedItemMapper } from '@/mappers/sorted-items';
import { SortedItemModel } from '@/models/sorted-item.model';

@Injectable()
export class FindMaxIndexSortedItemRepository
  implements
    IBaseRepository<FindMaxIndexSortedItemDTO, Promise<SortedItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    where
  }: FindMaxIndexSortedItemDTO): Promise<SortedItemModel> {
    return new SortedItemMapper().toModel(
      await this.model.sortedItem.findFirst({
        where: {
          app: {
            equals: where.app
          },
          parent: {
            equals: where.parent
          }
        },
        orderBy: {
          index: 'desc'
        }
      })
    );
  }
}
