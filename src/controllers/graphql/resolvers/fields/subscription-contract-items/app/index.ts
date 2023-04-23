import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { SubscriptionContractItem } from '@/controllers/graphql/types/subscription-contract-item';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Resolver(() => SubscriptionContractItem)
export class SubscriptionContractItemAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() subscriptionContractItem: SubscriptionContractItemModel) {
    return (
      subscriptionContractItem.app &&
      this.appsLoader.findByIds.load(subscriptionContractItem.app)
    );
  }
}
