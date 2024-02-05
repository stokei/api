import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateCouponDTO } from '@/dtos/coupons/update-coupon.dto';

@Injectable()
export class UpdateCouponRepository
  implements IBaseRepository<UpdateCouponDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCouponDTO): Promise<boolean> {
    const updated = await this.model.coupon.update({
      where: {
        id: where?.coupon
      },
      data
    });
    return !!updated;
  }
}
