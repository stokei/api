import { Args, Query, Resolver } from '@nestjs/graphql';

import { SubscriptionsLoader } from '@/controllers/graphql/dataloaders/subscriptions.loader';
import { Subscription } from '@/controllers/graphql/types/subscription';
import {
  SubscriptionNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private readonly subscriptionsLoader: SubscriptionsLoader) {}

  @Query(() => Subscription)
  async subscription(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const subscription = await this.subscriptionsLoader.findByIds.load(id);
    if (!subscription) {
      throw new SubscriptionNotFoundException();
    }
    return subscription;
  }
}
