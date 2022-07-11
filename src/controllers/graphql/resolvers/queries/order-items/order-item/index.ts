import { Args, Query, Resolver } from '@nestjs/graphql';

import { OrderItemsLoader } from '@/controllers/graphql/dataloaders/order-items.loader';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { OrderItemNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => OrderItem)
export class OrderItemResolver {
  constructor(private readonly orderItemsLoader: OrderItemsLoader) {}

  @Query(() => OrderItem)
  async orderItem(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const orderItem = await this.orderItemsLoader.findByIds.load(id);
    if (!orderItem) {
      throw new OrderItemNotFoundException();
    }
    return orderItem;
  }
}
