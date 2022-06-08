import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { PlanMapper } from '@/mappers/plans';
import { PlanModel } from '@/models/plan.model';

@Injectable()
export class FindPlanByIdRepository
  implements IBaseRepository<string, Promise<PlanModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<PlanModel> {
    return new PlanMapper().toModel(
      await this.model.plan.findUnique({
        where: { id }
      })
    );
  }
}
