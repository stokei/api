import { Injectable, Scope } from '@nestjs/common';
import { PaginationMapper } from '@stokei/nestjs';
import DataLoader from 'dataloader';

import { CatalogItemModel } from '@/models/catalog-item.model';
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

  readonly findByCatalogIds = new DataLoader(
    async (catalogItemCatalogIds: string[]) => {
      const catalogItems = await this.catalogItemsService.execute({
        where: {
          AND: {
            catalog: {
              equals: catalogItemCatalogIds
            }
          }
        }
      });
      return catalogItemCatalogIds.map((catalogId) => {
        const items = catalogItems?.items?.filter(
          (catalogItem) => catalogItem.catalog === catalogId
        );
        return new PaginationMapper<CatalogItemModel>().toPaginationList({
          totalCount: items?.length || 0,
          items
        });
      });
    }
  );
}
