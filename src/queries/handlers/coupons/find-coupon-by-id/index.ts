import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CouponNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CouponModel } from '@/models/coupon.model';
import { FindCouponByIdQuery } from '@/queries/implements/coupons/find-coupon-by-id.query';
import { FindCouponByIdRepository } from '@/repositories/coupons/find-coupon-by-id';

@QueryHandler(FindCouponByIdQuery)
export class FindCouponByIdQueryHandler
  implements IQueryHandler<FindCouponByIdQuery>
{
  constructor(
    private readonly findCouponByIdRepository: FindCouponByIdRepository
  ) {}

  async execute(query: FindCouponByIdQuery): Promise<CouponModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const coupon = await this.findCouponByIdRepository.execute(id);
    if (!coupon) {
      throw new CouponNotFoundException();
    }
    return coupon;
  }
}
