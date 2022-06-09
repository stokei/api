import { Args, Query, Resolver } from '@nestjs/graphql';

import { OrdersLoader } from '@/controllers/graphql/dataloaders/orders.loader';
import { Order } from '@/controllers/graphql/types/order';
import { OrderNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly ordersLoader: OrdersLoader) {}

  @Query(() => Order)
  async order(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const order = await this.ordersLoader.findByIds.load(id);
    if (!order) {
      throw new OrderNotFoundException();
    }
    return order;
  }
}
