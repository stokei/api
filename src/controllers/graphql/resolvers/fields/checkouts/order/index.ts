import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { OrdersLoader } from '@/controllers/graphql/dataloaders/orders.loader';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { Order } from '@/controllers/graphql/types/order';
import { CheckoutModel } from '@/models/checkout.model';

@Resolver(() => Checkout)
export class CheckoutOrderResolver {
  constructor(private readonly ordersLoader: OrdersLoader) {}

  @ResolveField(() => Order, { nullable: true })
  order(@Parent() checkout: CheckoutModel) {
    return checkout.order && this.ordersLoader.findByIds.load(checkout.order);
  }
}
