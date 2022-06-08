import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsProjectsPlansDTO } from '@/dtos/projects-plans/exists-projects-plans.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsProjectsPlansRepository
  implements IBaseRepository<ExistsProjectsPlansDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsProjectsPlansDTO): Promise<boolean> {
    return (await this.model.projectsPlan.count({ where })) > 0;
  }
}
