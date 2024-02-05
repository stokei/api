import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Coupon } from '@/controllers/graphql/types/coupon';
import { CouponModel } from '@/models/coupon.model';

@Resolver(() => Coupon)
export class CouponAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() coupon: CouponModel) {
    return coupon.app && this.appsLoader.findByIds.load(coupon.app);
  }
}
