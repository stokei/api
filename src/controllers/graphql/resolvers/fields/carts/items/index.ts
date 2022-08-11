import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllCartItemsInput } from '@/controllers/graphql/inputs/cart-items/find-all-cart-items.input';
import { Cart } from '@/controllers/graphql/types/cart';
import { CartItems } from '@/controllers/graphql/types/cart-items';
import { CartModel } from '@/models/cart.model';
import { FindAllCartItemsService } from '@/services/cart-items/find-all-cart-items';

@Resolver(() => Cart)
export class CartCartItemsResolver {
  constructor(
    private readonly findAllCartItemsService: FindAllCartItemsService
  ) {}

  @ResolveField(() => CartItems, { nullable: true })
  phones(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCartItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCartItemsInput,
    @Parent() cart: CartModel
  ) {
    return this.findAllCartItemsService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: cart.id
          }
        }
      }
    });
  }
}
