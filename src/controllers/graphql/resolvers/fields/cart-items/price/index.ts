import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { Price } from '@/controllers/graphql/types/price';
import { CartItemModel } from '@/models/cart-item.model';

@Resolver(() => CartItem)
export class CartItemPriceResolver {
  constructor(private readonly pricesLoader: PricesLoader) {}

  @ResolveField(() => Price, { nullable: true })
  price(@Parent() cartItem: CartItemModel) {
    return cartItem.price && this.pricesLoader.findByIds.load(cartItem.price);
  }
}
