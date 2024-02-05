import { CouponAppResolver } from './app';
import { CouponCreatedByResolver } from './created-by';
import { CouponRecipientResolver } from './recipient';
import { CouponReferenceResolver } from './reference';
import { CouponUpdatedByResolver } from './updated-by';

export const CouponsFieldsResolvers = [
  CouponReferenceResolver,
  CouponAppResolver,
  CouponRecipientResolver,
  CouponCreatedByResolver,
  CouponUpdatedByResolver
];
