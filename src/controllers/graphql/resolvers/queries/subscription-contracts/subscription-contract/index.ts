import { Args, Query, Resolver } from '@nestjs/graphql';

import { SubscriptionContractsLoader } from '@/controllers/graphql/dataloaders/subscription-contracts.loader';
import { SubscriptionContract } from '@/controllers/graphql/types/subscription-contract';
import {
  SubscriptionContractNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => SubscriptionContract)
export class SubscriptionContractResolver {
  constructor(
    private readonly subscriptionContractsLoader: SubscriptionContractsLoader
  ) {}

  @Query(() => SubscriptionContract)
  async subscriptionContract(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const subscriptionContract =
      await this.subscriptionContractsLoader.findByIds.load(id);
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }
    return subscriptionContract;
  }
}
