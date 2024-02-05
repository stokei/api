import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CouponModel } from '@/models/coupon.model';
import { FindCouponByIdQuery } from '@/queries/implements/coupons/find-coupon-by-id.query';

@Injectable()
export class FindCouponByIdService
  implements IBaseService<string, Promise<CouponModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CouponModel> {
    return await this.queryBus.execute(new FindCouponByIdQuery(data));
  }
}
