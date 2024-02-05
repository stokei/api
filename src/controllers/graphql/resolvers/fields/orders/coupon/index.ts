import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { CouponsLoader } from '@/controllers/graphql/dataloaders/coupons.loader';
import { Coupon } from '@/controllers/graphql/types/coupon';
import { Order } from '@/controllers/graphql/types/order';
import { OrderModel } from '@/models/order.model';

@Resolver(() => Order)
export class OrderCouponResolver {
  constructor(private readonly couponsLoader: CouponsLoader) {}

  @ResolveField(() => Coupon, { nullable: true })
  coupon(@Parent() order: OrderModel) {
    return order.coupon && this.couponsLoader.findByIds.load(order.coupon);
  }
}
