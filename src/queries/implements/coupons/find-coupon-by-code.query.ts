import { IQuery } from '@nestjs/cqrs';

import { FindCouponByCodeDTO } from '@/dtos/coupons/find-coupon-by-code.dto';

export class FindCouponByCodeQuery implements IQuery, FindCouponByCodeDTO {
  code: string;
  app: string;

  constructor(data: FindCouponByCodeDTO) {
    this.code = data.code;
    this.app = data.app;
  }
}
