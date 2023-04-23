import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { Currency } from '@/controllers/graphql/types/currency';
import { Price } from '@/controllers/graphql/types/price';
import { PriceModel } from '@/models/price.model';

@Resolver(() => Price)
export class PriceCurrencyResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @ResolveField(() => Currency, { nullable: true })
  currency(@Parent() price: PriceModel) {
    return (
      price.currency && this.currenciesLoader.findByIds.load(price.currency)
    );
  }
}
