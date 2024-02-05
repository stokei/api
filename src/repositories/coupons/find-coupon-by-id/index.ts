import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CouponMapper } from '@/mappers/coupons';
import { CouponModel } from '@/models/coupon.model';

@Injectable()
export class FindCouponByIdRepository
  implements IBaseRepository<string, Promise<CouponModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CouponModel> {
    return new CouponMapper().toModel(
      await this.model.coupon.findUnique({
        where: { id }
      })
    );
  }
}
