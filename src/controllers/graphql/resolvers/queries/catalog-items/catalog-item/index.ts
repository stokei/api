import { Args, Query, Resolver } from '@nestjs/graphql';

import { CatalogItemsLoader } from '@/controllers/graphql/dataloaders/catalog-items.loader';
import { CatalogItem } from '@/controllers/graphql/types/catalog-item';
import { CatalogItemNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => CatalogItem)
export class CatalogItemResolver {
  constructor(private readonly catalogItemsLoader: CatalogItemsLoader) {}

  @Query(() => CatalogItem)
  async catalogItem(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const catalogItem = await this.catalogItemsLoader.findByIds.load(id);
    if (!catalogItem) {
      throw new CatalogItemNotFoundException();
    }
    return catalogItem;
  }
}
