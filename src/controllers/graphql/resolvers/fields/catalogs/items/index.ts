import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CatalogItemsLoader } from '@/controllers/graphql/dataloaders/catalog-items.loader';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { CatalogItems } from '@/controllers/graphql/types/catalog-items';
import { CatalogModel } from '@/models/catalog.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => Catalog)
export class CatalogCatalogItemsResolver {
  constructor(
    private readonly catalogItemsLoader: CatalogItemsLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @ResolveField(() => CatalogItems, { nullable: true })
  async items(@Parent() catalog: CatalogModel) {
    return await this.getOrSetCacheService.execute(
      CatalogCatalogItemsResolver.name + catalog.id,
      () => this.catalogItemsLoader.findByCatalogIds.load(catalog.id)
    );
  }
}
