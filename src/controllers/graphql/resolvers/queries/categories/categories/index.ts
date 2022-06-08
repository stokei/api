import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllCategoriesInput,
  WhereDataFindAllCategoriesInput
} from '@/controllers/graphql/inputs/categories/find-all-categories.input';
import { Category } from '@/controllers/graphql/types/category';
import { Categories } from '@/controllers/graphql/types/categories';
import { FindAllCategoriesService } from '@/services/categories/find-all-categories';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private readonly findAllCategoriesService: FindAllCategoriesService
  ) {}

  @Query(() => Categories)
  async categories(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCategoriesInput,
      nullable: true
    })
    where: WhereDataFindAllCategoriesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCategoriesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCategoriesInput
  ) {
    return await this.findAllCategoriesService.execute({
      page,
      where,
      orderBy
    });
  }
}
