import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CatalogsLoader } from '@/controllers/graphql/dataloaders/catalogs.loader';
import { Catalog } from '@/controllers/graphql/types/catalog';

@Resolver(() => Catalog)
export class CatalogReferenceResolver {
  constructor(private readonly catalogsLoader: CatalogsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.catalogsLoader.findByIds.load(reference.id);
  }
}
