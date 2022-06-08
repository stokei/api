import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { Product } from '@/controllers/graphql/types/product';

@Resolver(() => Product)
export class ProductReferenceResolver {
  constructor(private readonly productsLoader: ProductsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.productsLoader.findByIds.load(reference.id);
  }
}
