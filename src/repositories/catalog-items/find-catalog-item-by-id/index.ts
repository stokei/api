import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CatalogItemMapper } from '@/mappers/catalog-items';
import { CatalogItemModel } from '@/models/catalog-item.model';

@Injectable()
export class FindCatalogItemByIdRepository
  implements IBaseRepository<string, Promise<CatalogItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CatalogItemModel> {
    return new CatalogItemMapper().toModel(
      await this.model.catalogItem.findUnique({
        where: { id }
      })
    );
  }
}
