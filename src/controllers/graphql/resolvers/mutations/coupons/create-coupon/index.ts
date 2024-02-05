import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCouponInput } from '@/controllers/graphql/inputs/coupons/create-coupon.input';
import { Coupon } from '@/controllers/graphql/types/coupon';
import { CreateCouponService } from '@/services/coupons/create-coupon';

@Resolver(() => Coupon)
export class CreateCouponResolver {
  constructor(private readonly createCouponService: CreateCouponService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Coupon)
  async createCoupon(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateCouponInput
  ) {
    const response = await this.createCouponService.execute({
      ...data,
      parent: appId,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
