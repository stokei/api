import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateCouponInput } from '@/controllers/graphql/inputs/coupons/update-coupon.input';
import { Coupon } from '@/controllers/graphql/types/coupon';
import { UpdateCouponService } from '@/services/coupons/update-coupon';

@Resolver(() => Coupon)
export class UpdateCouponResolver {
  constructor(private readonly updateCouponService: UpdateCouponService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Coupon)
  async updateCoupon(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateCouponInput
  ) {
    const response = await this.updateCouponService.execute({
      where: {
        ...data?.where,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
