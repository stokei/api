import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { SubscriptionContractItem } from '@/controllers/graphql/types/subscription-contract-item';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Resolver(() => SubscriptionContractItem)
export class SubscriptionContractItemUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() subscriptionContractItem: SubscriptionContractItemModel) {
    return (
      subscriptionContractItem.updatedBy &&
      this.accountsLoader.findByIds.load(subscriptionContractItem.updatedBy)
    );
  }
}
