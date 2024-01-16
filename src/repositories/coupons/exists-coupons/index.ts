import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCouponsDTO } from '@/dtos/coupons/exists-coupons.dto';

@Injectable()
export class ExistsCouponsRepository
  implements IBaseRepository<ExistsCouponsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCouponsDTO): Promise<boolean> {
    return (await this.model.coupon.count({ where })) > 0;
  }
}
