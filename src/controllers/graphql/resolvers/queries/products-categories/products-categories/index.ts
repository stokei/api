import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllProductsCategoriesInput,
  WhereDataFindAllProductsCategoriesInput
} from '@/controllers/graphql/inputs/products-categories/find-all-products-categories.input';
import { ProductsCategories } from '@/controllers/graphql/types/products-categories';
import { ProductsCategory } from '@/controllers/graphql/types/products-category';
import { FindAllProductsCategoriesService } from '@/services/products-categories/find-all-products-categories';

@Resolver(() => ProductsCategory)
export class ProductsCategoriesResolver {
  constructor(
    private readonly findAllProductsCategoriesService: FindAllProductsCategoriesService
  ) {}

  @Query(() => ProductsCategories)
  async productsCategories(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllProductsCategoriesInput,
      nullable: true
    })
    where: WhereDataFindAllProductsCategoriesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllProductsCategoriesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllProductsCategoriesInput
  ) {
    return await this.findAllProductsCategoriesService.execute({
      page,
      where,
      orderBy
    });
  }
}
