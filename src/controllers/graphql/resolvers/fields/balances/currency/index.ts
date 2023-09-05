import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { Balance } from '@/controllers/graphql/types/balance';
import { Currency } from '@/controllers/graphql/types/currency';
import { BalanceModel } from '@/models/balance.model';

@Resolver(() => Balance)
export class BalanceCurrencyResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @ResolveField(() => Currency, { nullable: true })
  currency(@Parent() balance: BalanceModel) {
    return (
      balance.currency && this.currenciesLoader.findByIds.load(balance.currency)
    );
  }
}
