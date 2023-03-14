import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { CatalogItemsLoader } from '@/controllers/graphql/dataloaders/catalog-items.loader';
import { CatalogsLoader } from '@/controllers/graphql/dataloaders/catalogs.loader';
import { HerosLoader } from '@/controllers/graphql/dataloaders/heros.loader';
import {
  SortedItem,
  SortedItemUnion
} from '@/controllers/graphql/types/sorted-item';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SortedItemModel } from '@/models/sorted-item.model';

@Resolver(() => SortedItem)
export class SortedItemItemResolver {
  constructor(
    private readonly catalogsLoader: CatalogsLoader,
    private readonly catalogItemsLoader: CatalogItemsLoader,
    private readonly herosLoader: HerosLoader
  ) {}

  @ResolveField(() => SortedItemUnion, { nullable: true })
  async item(@Parent() sortedItem: SortedItemModel) {
    const getItem = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.CATALOGS]: () =>
          this.catalogsLoader.findByIds.load(sortedItem.item),
        [ServerStokeiApiIdPrefix.CATALOG_ITEMS]: () =>
          this.catalogItemsLoader.findByIds.load(sortedItem.item),
        [ServerStokeiApiIdPrefix.HEROS]: () =>
          this.herosLoader.findByIds.load(sortedItem.item)
      };
      const serviceName = splitServiceId(sortedItem.item)?.service;
      return handlers?.[serviceName];
    };
    const getItemHandler = await getItem();
    return sortedItem.item && getItemHandler?.();
  }
}
