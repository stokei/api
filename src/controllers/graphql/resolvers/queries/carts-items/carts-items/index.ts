import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCartsItemsInput,
  WhereDataFindAllCartsItemsInput
} from '@/controllers/graphql/inputs/carts-items/find-all-carts-items.input';
import { CartsItem } from '@/controllers/graphql/types/carts-item';
import { CartsItems } from '@/controllers/graphql/types/carts-items';
import { FindAllCartsItemsService } from '@/services/carts-items/find-all-carts-items';

@Resolver(() => CartsItem)
export class CartsItemsResolver {
  constructor(
    private readonly findAllCartsItemsService: FindAllCartsItemsService
  ) {}

  @Query(() => CartsItems)
  async cartsItems(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCartsItemsInput,
      nullable: true
    })
    where: WhereDataFindAllCartsItemsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCartsItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCartsItemsInput
  ) {
    return await this.findAllCartsItemsService.execute({
      page,
      where,
      orderBy
    });
  }
}
