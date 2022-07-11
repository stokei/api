import { Resolver, ResolveReference } from '@nestjs/graphql';

import { PaymentMethodsLoader } from '@/controllers/graphql/dataloaders/payment-methods.loader';
import { PaymentMethod } from '@/controllers/graphql/types/payment-method';

@Resolver(() => PaymentMethod)
export class PaymentMethodReferenceResolver {
  constructor(private readonly paymentMethodsLoader: PaymentMethodsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.paymentMethodsLoader.findByIds.load(reference.id);
  }
}
