import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ProductsCategoriesLoader } from '@/controllers/graphql/dataloaders/products-categories.loader';
import { ProductsCategory } from '@/controllers/graphql/types/products-category';

@Resolver(() => ProductsCategory)
export class ProductsCategoryReferenceResolver {
  constructor(
    private readonly productsCategoriesLoader: ProductsCategoriesLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.productsCategoriesLoader.findByIds.load(reference.id);
  }
}
