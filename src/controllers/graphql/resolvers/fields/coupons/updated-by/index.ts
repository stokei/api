import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AccountsLoader } from '@/controllers/graphql/dataloaders/accounts.loader';
import { Account } from '@/controllers/graphql/types/account';
import { Coupon } from '@/controllers/graphql/types/coupon';
import { CouponModel } from '@/models/coupon.model';

@Resolver(() => Coupon)
export class CouponUpdatedByResolver {
  constructor(private readonly accountsLoader: AccountsLoader) {}

  @ResolveField(() => Account, { nullable: true })
  updatedBy(@Parent() coupon: CouponModel) {
    return (
      coupon.updatedBy && this.accountsLoader.findByIds.load(coupon.updatedBy)
    );
  }
}
