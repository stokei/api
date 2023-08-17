import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { Price } from '@/controllers/graphql/types/price';
import { OrderItemModel } from '@/models/order-item.model';

@Resolver(() => OrderItem)
export class OrderItemPriceResolver {
  constructor(private readonly pricesLoader: PricesLoader) {}

  @ResolveField(() => Price, { nullable: true })
  price(@Parent() orderItem: OrderItemModel) {
    return orderItem.price && this.pricesLoader.findByIds.load(orderItem.price);
  }
}
