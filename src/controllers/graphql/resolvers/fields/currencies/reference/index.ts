import { Resolver, ResolveReference } from '@nestjs/graphql';
import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { Currency } from '@/controllers/graphql/types/currency';

@Resolver(() => Currency)
export class CurrencyReferenceResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.currenciesLoader.findByIds.load(reference.id);
  }
}
