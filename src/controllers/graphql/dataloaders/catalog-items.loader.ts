import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCatalogItemsService } from '@/services/catalog-items/find-all-catalog-items';
import { FindAllCatalogItemsByCatalogIdsService } from '@/services/catalog-items/find-all-catalog-items-by-catalog-ids';

@Injectable({ scope: Scope.REQUEST })
export class CatalogItemsLoader {
  constructor(
    private readonly catalogItemsService: FindAllCatalogItemsService,
    private readonly findAllCatalogItemsByCatalogIdsService: FindAllCatalogItemsByCatalogIdsService
  ) {}

  readonly findByIds = new DataLoader(async (catalogItemIds: string[]) => {
    const catalogItems = await this.catalogItemsService.execute({
      where: {
        AND: {
          ids: catalogItemIds
        }
      }
    });
    const catalogItemsMap = new Map(
      catalogItems?.items?.map((catalogItem) => [catalogItem.id, catalogItem])
    );
    return catalogItemIds.map((catalogItemId) =>
      catalogItemsMap.get(catalogItemId)
    );
  });

  readonly findByCatalogIds = new DataLoader(
    async (catalogItemCatalogIds: string[]) => {
      const catalogItems =
        await this.findAllCatalogItemsByCatalogIdsService.execute({
          catalogs: catalogItemCatalogIds,
          pageLimit: 8
        });
      return catalogItemCatalogIds.map((catalogId) => {
        return catalogItems?.filter(
          (catalogItem) => catalogItem.catalog === catalogId
        );
      });
    }
  );
}
