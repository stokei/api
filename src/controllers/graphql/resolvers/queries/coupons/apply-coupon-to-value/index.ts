import { Args, Query, Resolver } from '@nestjs/graphql';

import { ApplyCouponToValueInput } from '@/controllers/graphql/inputs/coupons/apply-coupon-to-value.input';
import { ApplyCouponToValue } from '@/controllers/graphql/types/apply-coupon-to-value';
import { ApplyCouponToValueService } from '@/services/coupons/apply-coupon-to-value';

@Resolver(() => ApplyCouponToValue)
export class ApplyCouponToValueResolver {
  constructor(
    private readonly applyCouponToValueService: ApplyCouponToValueService
  ) {}

  @Query(() => ApplyCouponToValue)
  applyCouponToValue(@Args('input') input: ApplyCouponToValueInput) {
    return this.applyCouponToValueService.execute(input);
  }
}
