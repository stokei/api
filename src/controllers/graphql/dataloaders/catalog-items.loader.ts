import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCatalogItemsService } from '@/services/catalog-items/find-all-catalog-items';

@Injectable({ scope: Scope.REQUEST })
export class CatalogItemsLoader {
  constructor(
    private readonly catalogItemsService: FindAllCatalogItemsService
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
}
