import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PaymentMethodsLoader } from '@/controllers/graphql/dataloaders/payment-methods.loader';
import { Payment } from '@/controllers/graphql/types/payment';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { PaymentModel } from '@/models/payment.model';

@Resolver(() => Payment)
export class PaymentPaymentMethodResolver {
  constructor(private readonly paymentMethodsLoader: PaymentMethodsLoader) {}

  @ResolveField(() => PaymentMethod, { nullable: true })
  paymentMethod(@Parent() payment: PaymentModel) {
    return (
      payment.paymentMethod &&
      this.paymentMethodsLoader.findByIds.load(payment.paymentMethod)
    );
  }
}
