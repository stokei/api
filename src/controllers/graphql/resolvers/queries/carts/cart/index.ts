import { Args, Query, Resolver } from '@nestjs/graphql';
import { CartsLoader } from '@/controllers/graphql/dataloaders/carts.loader';
import { Cart } from '@/controllers/graphql/types/cart';
import { CartNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartsLoader: CartsLoader) {}

  @Query(() => Cart)
  async cart(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const cart = await this.cartsLoader.findByIds.load(id);
    if (!cart) {
      throw new CartNotFoundException();
    }
    return cart;
  }
}
