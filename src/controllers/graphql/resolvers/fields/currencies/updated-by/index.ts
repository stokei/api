import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Currency } from '@/controllers/graphql/types/currency';
import { CurrencyModel } from '@/models/currency.model';

@Resolver(() => Currency)
export class CurrencyUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() currency: CurrencyModel) {
    return (
      currency.updatedBy &&
      this.accountsLoader.findByIds.load(currency.updatedBy)
    );
  }
}
