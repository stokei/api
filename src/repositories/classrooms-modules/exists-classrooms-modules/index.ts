import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsModulesDTO } from '@/dtos/classrooms-modules/exists-classrooms-modules.dto';

@Injectable()
export class ExistsClassroomsModulesRepository
  implements IBaseRepository<ExistsClassroomsModulesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsModulesDTO): Promise<boolean> {
    return (await this.model.classroomsModule.count({ where })) > 0;
  }
}
