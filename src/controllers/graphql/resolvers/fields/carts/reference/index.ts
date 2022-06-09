import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CartsLoader } from '@/controllers/graphql/dataloaders/carts.loader';
import { Cart } from '@/controllers/graphql/types/cart';

@Resolver(() => Cart)
export class CartReferenceResolver {
  constructor(private readonly cartsLoader: CartsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.cartsLoader.findByIds.load(reference.id);
  }
}
