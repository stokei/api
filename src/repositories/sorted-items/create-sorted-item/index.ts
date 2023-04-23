import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateSortedItemRepositoryDTO } from '@/dtos/sorted-items/create-sorted-item-repository.dto';
import { SortedItemMapper } from '@/mappers/sorted-items';
import { SortedItemModel } from '@/models/sorted-item.model';

@Injectable()
export class CreateSortedItemRepository
  implements
    IBaseRepository<CreateSortedItemRepositoryDTO, Promise<SortedItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateSortedItemRepositoryDTO): Promise<SortedItemModel> {
    return new SortedItemMapper().toModel(
      await this.model.sortedItem.create({ data })
    );
  }
}
