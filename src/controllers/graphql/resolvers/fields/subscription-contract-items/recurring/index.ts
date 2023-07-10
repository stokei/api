import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { RecurringsLoader } from '@/controllers/graphql/dataloaders/recurrings.loader';
import { Recurring } from '@/controllers/graphql/types/recurring';
import { SubscriptionContractItem } from '@/controllers/graphql/types/subscription-contract-item';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Resolver(() => SubscriptionContractItem)
export class SubscriptionContractItemRecurringResolver {
  constructor(private readonly recurringsLoader: RecurringsLoader) {}

  @ResolveField(() => Recurring, { nullable: true })
  recurring(@Parent() subscriptionContractItem: SubscriptionContractItemModel) {
    return (
      subscriptionContractItem.recurring &&
      this.recurringsLoader.findByIds.load(subscriptionContractItem.recurring)
    );
  }
}
