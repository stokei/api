import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllPlansDTO } from '@/dtos/plans/find-all-plans.dto';
import { PlanMapper } from '@/mappers/plans';
import { PlanModel } from '@/models/plan.model';

@Injectable()
export class FindAllPlansRepository
  implements IBaseRepository<FindAllPlansDTO, Promise<PlanModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllPlansDTO): Promise<PlanModel[]> {
    const planMapper = new PlanMapper();
    return planMapper.toModels(
      await this.model.plan.findMany(planMapper.toFindAllPrisma(data))
    );
  }
}
