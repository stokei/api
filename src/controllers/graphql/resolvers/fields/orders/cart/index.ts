import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CartsLoader } from '@/controllers/graphql/dataloaders/carts.loader';
import { Cart } from '@/controllers/graphql/types/cart';
import { Order } from '@/controllers/graphql/types/order';
import { OrderModel } from '@/models/order.model';

@Resolver(() => Order)
export class OrderCartResolver {
  constructor(private readonly cartsLoader: CartsLoader) {}

  @ResolveField(() => Cart, { nullable: true })
  cart(@Parent() order: OrderModel) {
    return order.cart && this.cartsLoader.findByIds.load(order.cart);
  }
}
