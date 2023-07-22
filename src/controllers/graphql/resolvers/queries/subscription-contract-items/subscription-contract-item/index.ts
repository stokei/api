import { Args, Query, Resolver } from '@nestjs/graphql';

import { SubscriptionContractItemsLoader } from '@/controllers/graphql/dataloaders/subscription-contract-items.loader';
import { SubscriptionContractItem } from '@/controllers/graphql/types/subscription-contract-item';
import {
  ParamNotFoundException,
  SubscriptionContractItemNotFoundException
} from '@/errors';

@Resolver(() => SubscriptionContractItem)
export class SubscriptionContractItemResolver {
  constructor(
    private readonly subscriptionContractItemsLoader: SubscriptionContractItemsLoader
  ) {}

  @Query(() => SubscriptionContractItem)
  async subscriptionContractItem(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const subscriptionContract =
      await this.subscriptionContractItemsLoader.findByIds.load(id);
    if (!subscriptionContract) {
      throw new SubscriptionContractItemNotFoundException();
    }
    return subscriptionContract;
  }
}
