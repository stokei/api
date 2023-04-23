import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CatalogItemsLoader } from '@/controllers/graphql/dataloaders/catalog-items.loader';
import { CatalogItem } from '@/controllers/graphql/types/catalog-item';

@Resolver(() => CatalogItem)
export class CatalogItemReferenceResolver {
  constructor(private readonly catalogItemsLoader: CatalogItemsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.catalogItemsLoader.findByIds.load(reference.id);
  }
}
