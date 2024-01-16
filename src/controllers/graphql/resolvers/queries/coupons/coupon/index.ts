import { Args, Query, Resolver } from '@nestjs/graphql';

import { CouponsLoader } from '@/controllers/graphql/dataloaders/coupons.loader';
import { Coupon } from '@/controllers/graphql/types/coupon';
import { CouponNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Coupon)
export class CouponResolver {
  constructor(private readonly couponsLoader: CouponsLoader) {}

  @Query(() => Coupon)
  async coupon(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const coupon = await this.couponsLoader.findByIds.load(id);
    if (!coupon) {
      throw new CouponNotFoundException();
    }
    return coupon;
  }
}
