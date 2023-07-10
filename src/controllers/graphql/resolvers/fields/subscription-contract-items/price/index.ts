import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { Price } from '@/controllers/graphql/types/price';
import { SubscriptionContractItem } from '@/controllers/graphql/types/subscription-contract-item';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Resolver(() => SubscriptionContractItem)
export class SubscriptionContractItemPriceResolver {
  constructor(private readonly pricesLoader: PricesLoader) {}

  @ResolveField(() => Price, { nullable: true })
  price(@Parent() subscriptionContractItem: SubscriptionContractItemModel) {
    return (
      subscriptionContractItem.price &&
      this.pricesLoader.findByIds.load(subscriptionContractItem.price)
    );
  }
}
