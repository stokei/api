import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCatalogItemDTO } from '@/dtos/catalog-items/remove-catalog-item.dto';

@Injectable()
export class RemoveCatalogItemRepository
  implements IBaseRepository<RemoveCatalogItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCatalogItemDTO): Promise<boolean> {
    const removed = await this.model.catalogItem.deleteMany({
      where: {
        app: where?.app,
        catalog: where?.catalog,
        product: where?.product
      }
    });
    return removed?.count > 0;
  }
}
