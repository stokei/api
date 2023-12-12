import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCatalogItemsByCatalogIdsDTO } from '@/dtos/catalog-items/find-all-catalog-items-by-catalog-ids.dto';
import { CatalogItemMapper } from '@/mappers/catalog-items';
import { CatalogItemModel } from '@/models/catalog-item.model';

@Injectable()
export class FindAllCatalogItemsByCatalogIdsRepository
  implements
    IBaseRepository<
      FindAllCatalogItemsByCatalogIdsDTO,
      Promise<CatalogItemModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    catalogs,
    pageLimit
  }: FindAllCatalogItemsByCatalogIdsDTO): Promise<CatalogItemModel[]> {
    const catalogItemMapper = new CatalogItemMapper();
    const MAX_LIMIT = 5;
    return catalogItemMapper.toModels(
      await this.model.$queryRaw`
        WITH grouped_catalog_items AS (
          SELECT
            catalog_items.*,
            ROW_NUMBER() OVER (PARTITION BY catalog ORDER BY created_at DESC) AS row_num
          FROM catalog_items
          WHERE catalog_items.catalog IN (${Prisma.join(catalogs)})
          ORDER BY catalog_items.created_at DESC
        ) SELECT grouped_catalog_items.* FROM grouped_catalog_items 
            WHERE row_num <= ${pageLimit || MAX_LIMIT};
      `
    );
  }
}
