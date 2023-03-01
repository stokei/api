import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCatalogItemsDTO } from '@/dtos/catalog-items/find-all-catalog-items.dto';
import { CatalogItemMapper } from '@/mappers/catalog-items';
import { CatalogItemModel } from '@/models/catalog-item.model';

@Injectable()
export class FindAllCatalogItemsRepository
  implements
    IBaseRepository<FindAllCatalogItemsDTO, Promise<CatalogItemModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCatalogItemsDTO): Promise<CatalogItemModel[]> {
    const catalogItemMapper = new CatalogItemMapper();
    return catalogItemMapper.toModels(
      await this.model.catalogItem.findMany(
        catalogItemMapper.toFindAllPrisma(data)
      )
    );
  }
}
