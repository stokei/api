import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Account } from '@/controllers/graphql/types/account';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractUpdatedByResolver {
  constructor(
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  @ResolveField(() => Account)
  updatedBy(@Parent() subscriptionContract: SubscriptionContractModel) {
    return this.findAccountByIdService.execute(subscriptionContract.updatedBy);
  }
}
