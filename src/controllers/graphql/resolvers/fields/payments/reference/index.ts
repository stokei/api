import { Resolver, ResolveReference } from '@nestjs/graphql';
import { PaymentsLoader } from '@/controllers/graphql/dataloaders/payments.loader';
import { Payment } from '@/controllers/graphql/types/payment';

@Resolver(() => Payment)
export class PaymentReferenceResolver {
  constructor(private readonly paymentsLoader: PaymentsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.paymentsLoader.findByIds.load(reference.id);
  }
}
