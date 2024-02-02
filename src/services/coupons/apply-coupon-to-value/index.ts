import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ApplyCouponToValueDTO } from '@/dtos/coupons/apply-coupon-to-value.dto';
import { CouponModel } from '@/models/coupon.model';
import { ApplyCouponToValueQuery } from '@/queries/implements/coupons/apply-coupon-to-value.query';

@Injectable()
export class ApplyCouponToValueService
  implements IBaseService<ApplyCouponToValueDTO, Promise<CouponModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: ApplyCouponToValueDTO): Promise<CouponModel> {
    return await this.queryBus.execute(new ApplyCouponToValueQuery(data));
  }
}
