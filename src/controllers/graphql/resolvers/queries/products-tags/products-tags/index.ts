import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllProductsTagsInput,
  WhereDataFindAllProductsTagsInput
} from '@/controllers/graphql/inputs/products-tags/find-all-products-tags.input';
import { ProductsTag } from '@/controllers/graphql/types/products-tag';
import { ProductsTags } from '@/controllers/graphql/types/products-tags';
import { FindAllProductsTagsService } from '@/services/products-tags/find-all-products-tags';

@Resolver(() => ProductsTag)
export class ProductsTagsResolver {
  constructor(
    private readonly findAllProductsTagsService: FindAllProductsTagsService
  ) {}

  @Query(() => ProductsTags)
  async productsTags(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllProductsTagsInput,
      nullable: true
    })
    where: WhereDataFindAllProductsTagsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllProductsTagsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllProductsTagsInput
  ) {
    return await this.findAllProductsTagsService.execute({
      page,
      where,
      orderBy
    });
  }
}
