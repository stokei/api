import { Resolver, ResolveReference } from '@nestjs/graphql';

import { OrdersItemsLoader } from '@/controllers/graphql/dataloaders/orders-items.loader';
import { OrdersItem } from '@/controllers/graphql/types/orders-item';

@Resolver(() => OrdersItem)
export class OrdersItemReferenceResolver {
  constructor(private readonly ordersItemsLoader: OrdersItemsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.ordersItemsLoader.findByIds.load(reference.id);
  }
}
