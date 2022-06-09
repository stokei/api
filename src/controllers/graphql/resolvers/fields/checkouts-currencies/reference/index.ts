import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CheckoutsCurrenciesLoader } from '@/controllers/graphql/dataloaders/checkouts-currencies.loader';
import { CheckoutsCurrency } from '@/controllers/graphql/types/checkouts-currency';

@Resolver(() => CheckoutsCurrency)
export class CheckoutsCurrencyReferenceResolver {
  constructor(
    private readonly checkoutsCurrenciesLoader: CheckoutsCurrenciesLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.checkoutsCurrenciesLoader.findByIds.load(reference.id);
  }
}
