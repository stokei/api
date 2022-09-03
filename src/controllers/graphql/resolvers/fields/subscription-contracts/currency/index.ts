import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrenciesLoader } from '@/controllers/graphql/dataloaders/currencies.loader';
import { Currency } from '@/controllers/graphql/types/currency';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractCurrencyResolver {
  constructor(private readonly currenciesLoader: CurrenciesLoader) {}

  @ResolveField(() => Currency, { nullable: true })
  currency(@Parent() subscriptionContract: SubscriptionContractModel) {
    return (
      subscriptionContract.currency &&
      this.currenciesLoader.findByIds.load(subscriptionContract.currency)
    );
  }
}
