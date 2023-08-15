import { Resolver, ResolveReference } from '@nestjs/graphql';

import { OrderItemsLoader } from '@/controllers/graphql/dataloaders/order-items.loader';
import { OrderItem } from '@/controllers/graphql/types/order-item';

@Resolver(() => OrderItem)
export class OrderItemReferenceResolver {
  constructor(private readonly orderItemsLoader: OrderItemsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.orderItemsLoader.findByIds.load(reference.id);
  }
}
