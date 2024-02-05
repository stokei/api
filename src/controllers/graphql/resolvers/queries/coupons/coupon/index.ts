import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CouponsLoader } from '@/controllers/graphql/dataloaders/coupons.loader';
import { Coupon } from '@/controllers/graphql/types/coupon';
import { CouponNotFoundException, ParamNotFoundException } from '@/errors';
import { FindCouponByCodeService } from '@/services/coupons/find-coupon-by-code';

@Resolver(() => Coupon)
export class CouponResolver {
  constructor(
    private readonly couponsLoader: CouponsLoader,
    private readonly findCouponByCodeService: FindCouponByCodeService
  ) {}

  @UseGuards(AppGuard)
  @Query(() => Coupon)
  async coupon(
    @Args('id', { nullable: true }) id: string,
    @Args('code', { nullable: true }) code: string,
    @CurrentApp('id') appId: string
  ) {
    if (!id && !code) {
      throw new ParamNotFoundException('id');
    }
    if (id) {
      const coupon = await this.couponsLoader.findByIds.load(id);
      if (!coupon) {
        throw new CouponNotFoundException();
      }
      return coupon;
    }
    const coupon = await this.findCouponByCodeService.execute({
      code,
      app: appId
    });
    if (!coupon) {
      throw new CouponNotFoundException();
    }
    return coupon;
  }
}
