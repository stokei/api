import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { App } from '@/controllers/graphql/types/app';
import { Currency } from '@/controllers/graphql/types/currency';
import { AppModel } from '@/models/app.model';

@Resolver(() => App)
export class AppCurrencyResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @ResolveField(() => Currency, { nullable: true })
  currency(@Parent() app: AppModel) {
    return app.currency && this.currenciesLoader.findByIds.load(app.currency);
  }
}
