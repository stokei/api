import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PaymentsLoader } from '@/controllers/graphql/dataloaders/payments.loader';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { Payment } from '@/controllers/graphql/types/payment';
import { CheckoutModel } from '@/models/checkout.model';

@Resolver(() => Checkout)
export class CheckoutPaymentResolver {
  constructor(private readonly paymentsLoader: PaymentsLoader) {}

  @ResolveField(() => Payment, { nullable: true })
  payment(@Parent() checkout: CheckoutModel) {
    return (
      checkout.payment && this.paymentsLoader.findByIds.load(checkout.payment)
    );
  }
}
