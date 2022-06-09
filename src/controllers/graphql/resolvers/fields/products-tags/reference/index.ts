import { Resolver, ResolveReference } from '@nestjs/graphql';

import { ProductsTagsLoader } from '@/controllers/graphql/dataloaders/products-tags.loader';
import { ProductsTag } from '@/controllers/graphql/types/products-tag';

@Resolver(() => ProductsTag)
export class ProductsTagReferenceResolver {
  constructor(private readonly productsTagsLoader: ProductsTagsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.productsTagsLoader.findByIds.load(reference.id);
  }
}
