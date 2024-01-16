import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCouponsInput,
  WhereDataFindAllCouponsInput
} from '@/controllers/graphql/inputs/coupons/find-all-coupons.input';
import { Coupon } from '@/controllers/graphql/types/coupon';
import { Coupons } from '@/controllers/graphql/types/coupons';
import { FindAllCouponsService } from '@/services/coupons/find-all-coupons';

@Resolver(() => Coupon)
export class CouponsResolver {
  constructor(private readonly findAllCouponsService: FindAllCouponsService) {}

  @Query(() => Coupons)
  async coupons(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllCouponsInput, nullable: true })
    where: WhereDataFindAllCouponsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCouponsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCouponsInput
  ) {
    return await this.findAllCouponsService.execute({
      page,
      where,
      orderBy
    });
  }
}
