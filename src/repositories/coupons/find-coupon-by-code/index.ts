import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindCouponByCodeDTO } from '@/dtos/coupons/find-coupon-by-code.dto';
import { CouponMapper } from '@/mappers/coupons';
import { CouponModel } from '@/models/coupon.model';

@Injectable()
export class FindCouponByCodeRepository
  implements IBaseRepository<FindCouponByCodeDTO, Promise<CouponModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ app, code }: FindCouponByCodeDTO): Promise<CouponModel> {
    return new CouponMapper().toModel(
      await this.model.coupon.findFirst({
        where: {
          code,
          app
        }
      })
    );
  }
}
