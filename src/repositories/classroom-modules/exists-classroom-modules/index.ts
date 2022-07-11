import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomModulesDTO } from '@/dtos/classroom-module s/exists-classroom-module s.dto';

@Injectable()
export class ExistsClassroomModulesRepository
  implements IBaseRepository<ExistsClassroomModulesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomModulesDTO): Promise<boolean> {
    return (await this.model.classroomModule.count({ where })) > 0;
  }
}
