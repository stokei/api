import { Resolver, ResolveReference } from '@nestjs/graphql';
import { OrdersLoader } from '@/controllers/graphql/dataloaders/orders.loader';
import { Order } from '@/controllers/graphql/types/order';

@Resolver(() => Order)
export class OrderReferenceResolver {
  constructor(private readonly ordersLoader: OrdersLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.ordersLoader.findByIds.load(reference.id);
  }
}
