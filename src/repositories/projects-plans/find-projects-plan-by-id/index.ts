import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ProjectsPlanMapper } from '@/mappers/projects-plans';
import { ProjectsPlanModel } from '@/models/projects-plan.model';

@Injectable()
export class FindProjectsPlanByIdRepository
  implements IBaseRepository<string, Promise<ProjectsPlanModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ProjectsPlanModel> {
    return new ProjectsPlanMapper().toModel(
      await this.model.projectsPlan.findUnique({
        where: { id }
      })
    );
  }
}
