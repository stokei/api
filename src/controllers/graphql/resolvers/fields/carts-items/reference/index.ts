import { Resolver, ResolveReference } from '@nestjs/graphql';
import { CartsItemsLoader } from '@/controllers/graphql/dataloaders/carts-items.loader';
import { CartsItem } from '@/controllers/graphql/types/carts-item';

@Resolver(() => CartsItem)
export class CartsItemReferenceResolver {
  constructor(private readonly cartsItemsLoader: CartsItemsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.cartsItemsLoader.findByIds.load(reference.id);
  }
}
