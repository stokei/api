import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { ApplyCouponToValueResponse } from '@/dtos/coupons/apply-coupon-to-value.dto';
import {
  CouponNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ApplyCouponToValueQuery } from '@/queries/implements/coupons/apply-coupon-to-value.query';
import { FindCouponByIdService } from '@/services/coupons/find-coupon-by-id';

@QueryHandler(ApplyCouponToValueQuery)
export class ApplyCouponToValueQueryHandler
  implements IQueryHandler<ApplyCouponToValueQuery>
{
  constructor(private readonly findCouponByIdService: FindCouponByIdService) {}

  async execute(
    query: ApplyCouponToValueQuery
  ): Promise<ApplyCouponToValueResponse> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const couponId = cleanValue(query.coupon);
    if (!couponId) {
      throw new ParamNotFoundException('coupon');
    }
    const value = cleanValueNumber(query.value);
    if (value <= 0) {
      throw new ParamNotFoundException('value');
    }

    const coupon = await this.findCouponByIdService.execute(couponId);
    if (!coupon) {
      throw new CouponNotFoundException();
    }

    const totalAmount = coupon.getAmountWithDiscount(value);
    const subtotalAmount = value;
    const discountAmount = subtotalAmount - totalAmount;
    return {
      subtotalAmount,
      discountAmount,
      totalAmount
    };
  }
}
