import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsProjectsDTO } from '@/dtos/projects/exists-projects.dto';

@Injectable()
export class ExistsProjectsRepository
  implements IBaseRepository<ExistsProjectsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsProjectsDTO): Promise<boolean> {
    return (await this.model.project.count({ where })) > 0;
  }
}
