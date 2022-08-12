import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { PlansLoader } from '@/controllers/graphql/dataloaders/plans.loader';
import { Plan } from '@/controllers/graphql/types/plan';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractModel } from '@/models/subscription-contract.model';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractPlanResolver {
  constructor(private readonly plansLoader: PlansLoader) {}

  @ResolveField(() => Plan, { nullable: true })
  plan(@Parent() subscriptionContract: SubscriptionContractModel) {
    const service = splitServiceId(subscriptionContract?.product)?.service;
    const isPlan = service === ServerStokeiApiIdPrefix.PLANS;
    return (
      isPlan &&
      subscriptionContract.product &&
      this.plansLoader.findByIds.load(subscriptionContract.product)
    );
  }
}
