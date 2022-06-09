import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateProjectsPlanDTO } from '@/dtos/projects-plans/create-projects-plan.dto';
import { ProjectsPlanMapper } from '@/mappers/projects-plans';
import { ProjectsPlanModel } from '@/models/projects-plan.model';

@Injectable()
export class CreateProjectsPlanRepository
  implements IBaseRepository<CreateProjectsPlanDTO, Promise<ProjectsPlanModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateProjectsPlanDTO): Promise<ProjectsPlanModel> {
    return new ProjectsPlanMapper().toModel(
      await this.model.projectsPlan.create({ data })
    );
  }
}
