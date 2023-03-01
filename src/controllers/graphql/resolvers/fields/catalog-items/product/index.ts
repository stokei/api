import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { CatalogItem } from '@/controllers/graphql/types/catalog-item';
import { CatalogItemModel } from '@/models/catalog-item.model';

@Resolver(() => CatalogItem)
export class CatalogItemCatalogResolver {
  constructor(private readonly productsLoader: ProductsLoader) {}

  @ResolveField(() => Catalog, { nullable: true })
  product(@Parent() catalogItem: CatalogItemModel) {
    return (
      catalogItem.product &&
      this.productsLoader.findByIds.load(catalogItem.product)
    );
  }
}
