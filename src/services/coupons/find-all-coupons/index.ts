import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCouponsDTO } from '@/dtos/coupons/find-all-coupons.dto';
import { CouponModel } from '@/models/coupon.model';
import { FindAllCouponsQuery } from '@/queries/implements/coupons/find-all-coupons.query';

@Injectable()
export class FindAllCouponsService
  implements
    IBaseService<FindAllCouponsDTO, Promise<IPaginatedType<CouponModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllCouponsDTO): Promise<IPaginatedType<CouponModel>> {
    return await this.queryBus.execute(new FindAllCouponsQuery(data));
  }
}
