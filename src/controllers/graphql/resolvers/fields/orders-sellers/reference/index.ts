import { Resolver, ResolveReference } from '@nestjs/graphql';
import { OrdersSellersLoader } from '@/controllers/graphql/dataloaders/orders-sellers.loader';
import { OrdersSeller } from '@/controllers/graphql/types/orders-seller';

@Resolver(() => OrdersSeller)
export class OrdersSellerReferenceResolver {
  constructor(private readonly ordersSellersLoader: OrdersSellersLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.ordersSellersLoader.findByIds.load(reference.id);
  }
}
