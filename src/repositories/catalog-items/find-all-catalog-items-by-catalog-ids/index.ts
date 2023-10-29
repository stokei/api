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
        WITH catalogItemsRecursive AS 
          (SELECT *, row_number() OVER (PARTITION BY catalog) rowCount FROM catalog_items)
        SELECT * FROM catalogItemsRecursive
          JOIN (SELECT DISTINCT catalog FROM catalog_items LIMIT ${
            pageLimit || MAX_LIMIT
          }) currentCatalogItems
          ON catalogItemsRecursive.catalog = currentCatalogItems.catalog
          WHERE 
            rowCount <= ${pageLimit || MAX_LIMIT} AND
            catalogItemsRecursive.catalog IN (${Prisma.join(catalogs)});
      `
    );
  }
}
