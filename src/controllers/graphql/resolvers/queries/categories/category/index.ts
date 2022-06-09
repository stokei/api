import { Args, Query, Resolver } from '@nestjs/graphql';

import { CategoriesLoader } from '@/controllers/graphql/dataloaders/categories.loader';
import { Category } from '@/controllers/graphql/types/category';
import { CategoryNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoriesLoader: CategoriesLoader) {}

  @Query(() => Category)
  async category(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const category = await this.categoriesLoader.findByIds.load(id);
    if (!category) {
      throw new CategoryNotFoundException();
    }
    return category;
  }
}
