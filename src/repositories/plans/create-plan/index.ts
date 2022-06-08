import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { PlanMapper } from '@/mappers/plans';
import { CreatePlanDTO } from '@/dtos/plans/create-plan.dto';
import { PlanModel } from '@/models/plan.model';

@Injectable()
export class CreatePlanRepository
  implements IBaseRepository<CreatePlanDTO, Promise<PlanModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePlanDTO): Promise<PlanModel> {
    return new PlanMapper().toModel(await this.model.plan.create({ data }));
  }
}
