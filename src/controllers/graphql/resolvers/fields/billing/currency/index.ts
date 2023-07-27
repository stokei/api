import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { Billing } from '@/controllers/graphql/types/billing';
import { Currency } from '@/controllers/graphql/types/currency';
import { BillingModel } from '@/models/billing.model';

@Resolver(() => Billing)
export class BillingCurrencyResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @ResolveField(() => Currency, { nullable: true })
  currency(@Parent() billing: BillingModel) {
    return (
      billing.currency && this.currenciesLoader.findByIds.load(billing.currency)
    );
  }
}
