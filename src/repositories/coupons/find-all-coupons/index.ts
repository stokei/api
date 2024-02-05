import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCouponsDTO } from '@/dtos/coupons/find-all-coupons.dto';
import { CouponMapper } from '@/mappers/coupons';
import { CouponModel } from '@/models/coupon.model';

@Injectable()
export class FindAllCouponsRepository
  implements IBaseRepository<FindAllCouponsDTO, Promise<CouponModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCouponsDTO): Promise<CouponModel[]> {
    const couponMapper = new CouponMapper();
    return couponMapper.toModels(
      await this.model.coupon.findMany(couponMapper.toFindAllPrisma(data))
    );
  }
}
