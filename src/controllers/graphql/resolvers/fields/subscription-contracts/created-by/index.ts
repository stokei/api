import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractCreatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  createdBy(@Parent() subscriptionContract: SubscriptionContractModel) {
    return (
      subscriptionContract.updatedBy &&
      this.accountsLoader.findByIds.load(subscriptionContract.createdBy)
    );
  }
}
