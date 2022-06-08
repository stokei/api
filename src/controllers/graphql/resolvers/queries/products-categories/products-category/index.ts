import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductsCategoriesLoader } from '@/controllers/graphql/dataloaders/products-categories.loader';
import { ProductsCategory } from '@/controllers/graphql/types/products-category';
import {
  ProductsCategoryNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ProductsCategory)
export class ProductsCategoryResolver {
  constructor(
    private readonly productsCategoriesLoader: ProductsCategoriesLoader
  ) {}

  @Query(() => ProductsCategory)
  async productsCategory(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const productsCategory = await this.productsCategoriesLoader.findByIds.load(
      id
    );
    if (!productsCategory) {
      throw new ProductsCategoryNotFoundException();
    }
    return productsCategory;
  }
}
