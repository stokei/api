import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractAppResolver {
  constructor(private readonly findAppByIdService: FindAppByIdService) {}

  @ResolveField(() => App)
  app(@Parent() subscriptionContract: SubscriptionContractModel) {
    return this.findAppByIdService.execute(subscriptionContract.app);
  }
}
