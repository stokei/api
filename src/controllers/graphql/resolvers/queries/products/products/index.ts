import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllProductsInput,
  WhereDataFindAllProductsInput
} from '@/controllers/graphql/inputs/products/find-all-products.input';
import { Product } from '@/controllers/graphql/types/product';
import { Products } from '@/controllers/graphql/types/products';
import { FindAllProductsService } from '@/services/products/find-all-products';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly findAllProductsService: FindAllProductsService
  ) {}

  @Query(() => Products)
  async products(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllProductsInput,
      nullable: true
    })
    where: WhereDataFindAllProductsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllProductsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllProductsInput
  ) {
    return await this.findAllProductsService.execute({
      page,
      where,
      orderBy
    });
  }
}
