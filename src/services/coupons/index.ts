import { ApplyCouponToValueService } from './apply-coupon-to-value';
import { CreateCouponService } from './create-coupon';
import { FindAllCouponsService } from './find-all-coupons';
import { FindCouponByCodeService } from './find-coupon-by-code';
import { FindCouponByIdService } from './find-coupon-by-id';
import { UpdateCouponService } from './update-coupon';

export const CouponServices = [
  CreateCouponService,
  UpdateCouponService,
  FindCouponByIdService,
  FindAllCouponsService,
  FindCouponByCodeService,
  ApplyCouponToValueService
];
