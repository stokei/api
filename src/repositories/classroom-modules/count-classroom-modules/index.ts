import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountClassroomModulesDTO } from '@/dtos/classroom-modules/count-classroom-modules.dto';
import { ClassroomModuleMapper } from '@/mappers/classroom-modules';

@Injectable()
export class CountClassroomModulesRepository
  implements IBaseRepository<CountClassroomModulesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountClassroomModulesDTO): Promise<number> {
    const classroomModuleMapper = new ClassroomModuleMapper();
    return await this.model.classroomModule.count({
      where: classroomModuleMapper.toWhereFindAllPrisma(where)
    });
  }
}
