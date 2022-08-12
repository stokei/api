import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { OrdersLoader } from '@/controllers/graphql/dataloaders/orders.loader';
import { Order } from '@/controllers/graphql/types/order';
import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentModel } from '@/models/payment.model';

@Resolver(() => Payment)
export class PaymentOrderResolver {
  constructor(private readonly ordersLoader: OrdersLoader) {}

  @ResolveField(() => Order, { nullable: true })
  order(@Parent() payment: PaymentModel) {
    return payment.order && this.ordersLoader.findByIds.load(payment.order);
  }
}
