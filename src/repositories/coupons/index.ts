import { CountCouponsRepository } from './count-coupons';
import { CreateCouponRepository } from './create-coupon';
import { ExistsCouponsRepository } from './exists-coupons';
import { FindAllCouponsRepository } from './find-all-coupons';
import { FindCouponByIdRepository } from './find-coupon-by-id';
import { UpdateCouponRepository } from './update-coupon';

export const CouponsRepositories = [
  CountCouponsRepository,
  CreateCouponRepository,
  ExistsCouponsRepository,
  FindCouponByIdRepository,
  FindAllCouponsRepository,
  UpdateCouponRepository
];
