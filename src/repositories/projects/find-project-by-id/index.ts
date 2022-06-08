import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { ProjectMapper } from '@/mappers/projects';
import { ProjectModel } from '@/models/project.model';

@Injectable()
export class FindProjectByIdRepository
  implements IBaseRepository<string, Promise<ProjectModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ProjectModel> {
    return new ProjectMapper().toModel(
      await this.model.project.findUnique({
        where: { id }
      })
    );
  }
}
