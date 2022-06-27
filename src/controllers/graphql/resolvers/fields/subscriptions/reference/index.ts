import { Resolver, ResolveReference } from '@nestjs/graphql';

import { SubscriptionsLoader } from '@/controllers/graphql/dataloaders/subscriptions.loader';
import { Subscription } from '@/controllers/graphql/types/subscription';

@Resolver(() => Subscription)
export class SubscriptionReferenceResolver {
  constructor(private readonly subscriptionsLoader: SubscriptionsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.subscriptionsLoader.findByIds.load(reference.id);
  }
}
