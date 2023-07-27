import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { BillingItem } from '@/controllers/graphql/types/billing-item';
import { Price } from '@/controllers/graphql/types/price';
import { BillingItemModel } from '@/models/billing-item.model';

@Resolver(() => BillingItem)
export class BillingItemPriceResolver {
  constructor(private readonly pricesLoader: PricesLoader) {}

  @ResolveField(() => Price, { nullable: true })
  price(@Parent() billingItem: BillingItemModel) {
    return (
      billingItem.price && this.pricesLoader.findByIds.load(billingItem.price)
    );
  }
}
