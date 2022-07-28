import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountPlansDTO } from '@/dtos/plans/count-plans.dto';
import { PlanMapper } from '@/mappers/plans';

@Injectable()
export class CountPlansRepository
  implements IBaseRepository<CountPlansDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountPlansDTO): Promise<number> {
    const planMapper = new PlanMapper();
    return await this.model.plan.count({
      where: planMapper.toWhereFindAllPrisma(where)
    });
  }
}
