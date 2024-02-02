import { ApplyCouponToValueQueryHandler } from './apply-coupon-to-value';
import { FindAllCouponsQueryHandler } from './find-all-coupons';
import { FindCouponByCodeQueryHandler } from './find-coupon-by-code';
import { FindCouponByIdQueryHandler } from './find-coupon-by-id';

export const CouponQueriesHandlers = [
  FindCouponByIdQueryHandler,
  FindAllCouponsQueryHandler,
  FindCouponByCodeQueryHandler,
  ApplyCouponToValueQueryHandler
];
