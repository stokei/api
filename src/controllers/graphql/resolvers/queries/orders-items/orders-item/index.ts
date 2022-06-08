import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrdersItemsLoader } from '@/controllers/graphql/dataloaders/orders-items.loader';
import { OrdersItem } from '@/controllers/graphql/types/orders-item';
import { OrdersItemNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => OrdersItem)
export class OrdersItemResolver {
  constructor(private readonly ordersItemsLoader: OrdersItemsLoader) {}

  @Query(() => OrdersItem)
  async ordersItem(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const ordersItem = await this.ordersItemsLoader.findByIds.load(id);
    if (!ordersItem) {
      throw new OrdersItemNotFoundException();
    }
    return ordersItem;
  }
}
