import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PaymentMethodsLoader } from '@/controllers/graphql/dataloaders/payment-methods.loader';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractPaymentMethodResolver {
  constructor(private readonly paymentMethodsLoader: PaymentMethodsLoader) {}

  @ResolveField(() => PaymentMethod, { nullable: true })
  paymentMethod(@Parent() subscriptionContract: SubscriptionContractModel) {
    return (
      subscriptionContract.paymentMethod &&
      this.paymentMethodsLoader.findByIds.load(
        subscriptionContract.paymentMethod
      )
    );
  }
}
