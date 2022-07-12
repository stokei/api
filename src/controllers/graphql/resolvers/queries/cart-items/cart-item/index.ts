import { Args, Query, Resolver } from '@nestjs/graphql';

import { CartItemsLoader } from '@/controllers/graphql/dataloaders/cart-items.loader';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { CartItemNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => CartItem)
export class CartItemResolver {
  constructor(private readonly cartItemsLoader: CartItemsLoader) {}

  @Query(() => CartItem)
  async cartItem(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const cartItem = await this.cartItemsLoader.findByIds.load(id);
    if (!cartItem) {
      throw new CartItemNotFoundException();
    }
    return cartItem;
  }
}
