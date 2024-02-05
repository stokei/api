import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  CouponNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CouponModel } from '@/models/coupon.model';
import { FindCouponByCodeQuery } from '@/queries/implements/coupons/find-coupon-by-code.query';
import { FindCouponByCodeRepository } from '@/repositories/coupons/find-coupon-by-code';

@QueryHandler(FindCouponByCodeQuery)
export class FindCouponByCodeQueryHandler
  implements IQueryHandler<FindCouponByCodeQuery>
{
  constructor(
    private readonly findCouponByCodeRepository: FindCouponByCodeRepository
  ) {}

  async execute(query: FindCouponByCodeQuery): Promise<CouponModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const code = cleanValue(query.code);
    if (!code) {
      throw new ParamNotFoundException('code');
    }
    const app = cleanValue(query.app);
    if (!app) {
      throw new ParamNotFoundException('app');
    }

    const coupon = await this.findCouponByCodeRepository.execute({
      app,
      code
    });
    if (!coupon) {
      throw new CouponNotFoundException();
    }
    return coupon;
  }
}
