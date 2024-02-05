import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindCouponByCodeDTO } from '@/dtos/coupons/find-coupon-by-code.dto';
import { CouponModel } from '@/models/coupon.model';
import { FindCouponByCodeQuery } from '@/queries/implements/coupons/find-coupon-by-code.query';

@Injectable()
export class FindCouponByCodeService
  implements IBaseService<FindCouponByCodeDTO, Promise<CouponModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindCouponByCodeDTO): Promise<CouponModel> {
    return await this.queryBus.execute(new FindCouponByCodeQuery(data));
  }
}
