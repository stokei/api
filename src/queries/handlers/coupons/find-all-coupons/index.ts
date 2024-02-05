import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CouponMapper } from '@/mappers/coupons';
import { CouponModel } from '@/models/coupon.model';
import { FindAllCouponsQuery } from '@/queries/implements/coupons/find-all-coupons.query';
import { CountCouponsRepository } from '@/repositories/coupons/count-coupons';
import { FindAllCouponsRepository } from '@/repositories/coupons/find-all-coupons';

@QueryHandler(FindAllCouponsQuery)
export class FindAllCouponsQueryHandler
  implements IQueryHandler<FindAllCouponsQuery>
{
  constructor(
    private readonly findAllCouponRepository: FindAllCouponsRepository,
    private readonly countCouponsRepository: CountCouponsRepository
  ) {}

  async execute(
    query: FindAllCouponsQuery
  ): Promise<IPaginatedType<CouponModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new CouponMapper().toFindAllQueryClean(query);
    const coupons = await this.findAllCouponRepository.execute(data);
    const totalCount = await this.countCouponsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CouponModel>().toPaginationList({
      items: coupons,
      page: data.page,
      totalCount
    });
  }
}
