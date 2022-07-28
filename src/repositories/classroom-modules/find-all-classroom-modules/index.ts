import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomModulesDTO } from '@/dtos/classroom-modules/find-all-classroom-modules.dto';
import { ClassroomModuleMapper } from '@/mappers/classroom-modules';
import { ClassroomModuleModel } from '@/models/classroom-module.model';

@Injectable()
export class FindAllClassroomModulesRepository
  implements
    IBaseRepository<
      FindAllClassroomModulesDTO,
      Promise<ClassroomModuleModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomModulesDTO
  ): Promise<ClassroomModuleModel[]> {
    const classroomModuleMapper = new ClassroomModuleMapper();
    return classroomModuleMapper.toModels(
      await this.model.classroomModule.findMany(
        classroomModuleMapper.toFindAllPrisma(data)
      )
    );
  }
}
