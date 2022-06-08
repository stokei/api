import { Args, Query, Resolver } from '@nestjs/graphql';
import { OrdersSellersLoader } from '@/controllers/graphql/dataloaders/orders-sellers.loader';
import { OrdersSeller } from '@/controllers/graphql/types/orders-seller';
import {
  OrdersSellerNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => OrdersSeller)
export class OrdersSellerResolver {
  constructor(private readonly ordersSellersLoader: OrdersSellersLoader) {}

  @Query(() => OrdersSeller)
  async ordersSeller(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const ordersSeller = await this.ordersSellersLoader.findByIds.load(id);
    if (!ordersSeller) {
      throw new OrdersSellerNotFoundException();
    }
    return ordersSeller;
  }
}
