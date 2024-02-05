import { ApplyCouponToValueResolver } from './apply-coupon-to-value';
import { CouponResolver } from './coupon';
import { CouponsResolver } from './coupons';

export const CouponsQueries = [
  CouponResolver,
  CouponsResolver,
  ApplyCouponToValueResolver
];
