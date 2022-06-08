import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrdersAddressesLoader } from '@/controllers/graphql/dataloaders/orders-addresses.loader';
import { OrdersAddress } from '@/controllers/graphql/types/orders-address';
import {
  OrdersAddressNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => OrdersAddress)
export class OrdersAddressResolver {
  constructor(private readonly ordersAddressesLoader: OrdersAddressesLoader) {}

  @Query(() => OrdersAddress)
  async ordersAddress(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const ordersAddress = await this.ordersAddressesLoader.findByIds.load(id);
    if (!ordersAddress) {
      throw new OrdersAddressNotFoundException();
    }
    return ordersAddress;
  }
}
