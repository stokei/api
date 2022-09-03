import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { AppModel } from '@/models/app.model';
import { FindAppCurrentSubscriptionPlanService } from '@/services/apps/find-app-current-subscription-plan';

@Resolver(() => App)
export class AppCurrentSubscriptionPlanResolver {
  constructor(
    private readonly findAppCurrentSubscriptionPlanService: FindAppCurrentSubscriptionPlanService
  ) {}

  @ResolveField(() => SubscriptionContract, { nullable: true })
  async currentSubscriptionPlan(@Parent() app: AppModel) {
    const subscriptionPlan =
      app.id &&
      (await this.findAppCurrentSubscriptionPlanService.execute(app.id));
    return subscriptionPlan?.subscription;
  }
}
