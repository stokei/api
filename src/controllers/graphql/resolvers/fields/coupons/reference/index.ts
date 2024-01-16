import { Resolver, ResolveReference } from '@nestjs/graphql';

import { CouponsLoader } from '@/controllers/graphql/dataloaders/coupons.loader';
import { Coupon } from '@/controllers/graphql/types/coupon';

@Resolver(() => Coupon)
export class CouponReferenceResolver {
  constructor(private readonly couponsLoader: CouponsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.couponsLoader.findByIds.load(reference.id);
  }
}
