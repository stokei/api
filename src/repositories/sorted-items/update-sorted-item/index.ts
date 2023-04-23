import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateSortedItemDTO } from '@/dtos/sorted-items/update-sorted-item.dto';

@Injectable()
export class UpdateSortedItemRepository
  implements IBaseRepository<UpdateSortedItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateSortedItemDTO): Promise<boolean> {
    const updated = await this.model.sortedItem.update({
      where: {
        id: where?.sortedItem
      },
      data
    });
    return !!updated;
  }
}
