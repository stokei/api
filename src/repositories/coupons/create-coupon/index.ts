import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCouponDTO } from '@/dtos/coupons/create-coupon.dto';
import { CouponMapper } from '@/mappers/coupons';
import { CouponModel } from '@/models/coupon.model';

@Injectable()
export class CreateCouponRepository
  implements IBaseRepository<CreateCouponDTO, Promise<CouponModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCouponDTO): Promise<CouponModel> {
    return new CouponMapper().toModel(await this.model.coupon.create({ data }));
  }
}
