import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCartItemsInput,
  WhereDataFindAllCartItemsInput
} from '@/controllers/graphql/inputs/cart-items/find-all-cart-items.input';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { CartItems } from '@/controllers/graphql/types/cart-items';
import { FindAllCartItemsService } from '@/services/cart-items/find-all-cart-items';

@Resolver(() => CartItem)
export class CartItemsResolver {
  constructor(
    private readonly findAllCartItemsService: FindAllCartItemsService
  ) {}

  @Query(() => CartItems)
  async cartItems(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCartItemsInput,
      nullable: true
    })
    where: WhereDataFindAllCartItemsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCartItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCartItemsInput
  ) {
    return await this.findAllCartItemsService.execute({
      page,
      where,
      orderBy
    });
  }
}
