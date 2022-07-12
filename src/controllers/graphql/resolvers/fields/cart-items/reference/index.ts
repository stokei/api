import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CartItemsLoader } from '@/controllers/graphql/dataloaders/cart-items.loader';
import { CartItem } from '@/controllers/graphql/types/cart-item';

@Resolver(() => CartItem)
export class CartItemReferenceResolver {
  constructor(private readonly cartItemsLoader: CartItemsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.cartItemsLoader.findByIds.load(reference.id);
  }
}
