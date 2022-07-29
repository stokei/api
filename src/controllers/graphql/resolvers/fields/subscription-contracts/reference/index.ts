import { Resolver, ResolveReference } from '@nestjs/graphql';

import { SubscriptionContractsLoader } from '@/controllers/graphql/dataloaders/subscription-contracts.loader';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractReferenceResolver {
  constructor(
    private readonly subscriptionContractsLoader: SubscriptionContractsLoader
  ) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.subscriptionContractsLoader.findByIds.load(reference.id);
  }
}
