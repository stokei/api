import { Resolver, ResolveReference } from '@nestjs/graphql';

import { OrdersAddressesLoader } from '@/controllers/graphql/dataloaders/orders-addresses.loader';
import { OrdersAddress } from '@/controllers/graphql/types/orders-address';

@Resolver(() => OrdersAddress)
export class OrdersAddressReferenceResolver {
  constructor(private readonly ordersAddressesLoader: OrdersAddressesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.ordersAddressesLoader.findByIds.load(reference.id);
  }
}
