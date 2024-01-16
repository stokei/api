import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCouponsDTO } from '@/dtos/coupons/count-coupons.dto';
import { CouponMapper } from '@/mappers/coupons';

@Injectable()
export class CountCouponsRepository
  implements IBaseRepository<CountCouponsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCouponsDTO): Promise<number> {
    const couponMapper = new CouponMapper();
    return await this.model.coupon.count({
      where: couponMapper.toWhereFindAllPrisma(where)
    });
  }
}
