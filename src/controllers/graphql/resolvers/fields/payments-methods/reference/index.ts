import { Resolver, ResolveReference } from '@nestjs/graphql';
import { PaymentsMethodsLoader } from '@/controllers/graphql/dataloaders/payments-methods.loader';
import { PaymentsMethod } from '@/controllers/graphql/types/payments-method';

@Resolver(() => PaymentsMethod)
export class PaymentsMethodReferenceResolver {
  constructor(private readonly paymentsMethodsLoader: PaymentsMethodsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.paymentsMethodsLoader.findByIds.load(reference.id);
  }
}
