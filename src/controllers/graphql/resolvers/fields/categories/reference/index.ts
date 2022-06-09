import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CategoriesLoader } from '@/controllers/graphql/dataloaders/categories.loader';
import { Category } from '@/controllers/graphql/types/category';

@Resolver(() => Category)
export class CategoryReferenceResolver {
  constructor(private readonly categoriesLoader: CategoriesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.categoriesLoader.findByIds.load(reference.id);
  }
}
