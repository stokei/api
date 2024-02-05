import { IQuery } from '@nestjs/cqrs';

import { ApplyCouponToValueDTO } from '@/dtos/coupons/apply-coupon-to-value.dto';

export class ApplyCouponToValueQuery implements IQuery, ApplyCouponToValueDTO {
  coupon: string;
  value: number;

  constructor(data: ApplyCouponToValueDTO) {
    this.coupon = data.coupon;
    this.value = data.value;
  }
}
