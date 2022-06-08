import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ProjectsPlanMapper } from '@/mappers/projects-plans';
import { CreateProjectsPlanDTO } from '@/dtos/projects-plans/create-projects-plan.dto';
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
