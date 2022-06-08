import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ProjectMapper } from '@/mappers/projects';
import { CreateProjectDTO } from '@/dtos/projects/create-project.dto';
import { ProjectModel } from '@/models/project.model';

@Injectable()
export class CreateProjectRepository
  implements IBaseRepository<CreateProjectDTO, Promise<ProjectModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateProjectDTO): Promise<ProjectModel> {
    return new ProjectMapper().toModel(
      await this.model.project.create({ data })
    );
  }
}
