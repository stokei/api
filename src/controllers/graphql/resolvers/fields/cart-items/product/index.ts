import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { Product } from '@/controllers/graphql/types/product';
import { CartItemModel } from '@/models/cart-item.model';

@Resolver(() => CartItem)
export class CartItemProductResolver {
  constructor(private readonly productsLoader: ProductsLoader) {}

  @ResolveField(() => Product)
  product(@Parent() cartItem: CartItemModel) {
    return (
      cartItem.product && this.productsLoader.findByIds.load(cartItem.product)
    );
  }
}
