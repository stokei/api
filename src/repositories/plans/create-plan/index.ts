import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePlanRepositoryDTO } from '@/dtos/plans/create-plan-repository.dto';
import { PlanMapper } from '@/mappers/plans';
import { PlanModel } from '@/models/plan.model';

@Injectable()
export class CreatePlanRepository
  implements IBaseRepository<CreatePlanRepositoryDTO, Promise<PlanModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePlanRepositoryDTO): Promise<PlanModel> {
    return new PlanMapper().toModel(await this.model.plan.create({ data }));
  }
}
