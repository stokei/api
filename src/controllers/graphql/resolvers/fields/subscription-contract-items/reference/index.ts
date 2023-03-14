import { Resolver, ResolveReference } from '@nestjs/graphql';

import { SubscriptionContractItemsLoader } from '@/controllers/graphql/dataloaders/subscription-contract-items.loader';
import { SubscriptionContractItem } from '@/controllers/graphql/types/subscription-contract-item';

@Resolver(() => SubscriptionContractItem)
export class SubscriptionContractItemReferenceResolver {
  constructor(
    private readonly subscriptionContractItemItemsLoader: SubscriptionContractItemsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.subscriptionContractItemItemsLoader.findByIds.load(
      reference.id
    );
  }
}
