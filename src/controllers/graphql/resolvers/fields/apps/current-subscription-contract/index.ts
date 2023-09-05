import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import { AppModel } from '@/models/app.model';
import { FindAppCurrentSubscriptionContractService } from '@/services/apps/find-app-current-subscription-contract';

@Resolver(() => App)
export class AppCurrentSubscriptionContractResolver {
  constructor(
    private readonly findAppCurrentSubscriptionContractService: FindAppCurrentSubscriptionContractService
  ) {}

  @ResolveField(() => SubscriptionContract, { nullable: true })
  async currentSubscriptionContract(@Parent() app: AppModel) {
    try {
      const subscriptionContract =
        app.id &&
        (await this.findAppCurrentSubscriptionContractService.execute(app.id));
      return subscriptionContract;
    } catch (error) {
      return;
    }
  }
}
