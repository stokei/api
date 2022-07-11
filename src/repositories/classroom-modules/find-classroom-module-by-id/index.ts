import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomModuleMapper } from '@/mappers/classroom-module s';
import { ClassroomModuleModel } from '@/models/classroom-module .model';

@Injectable()
export class FindClassroomModuleByIdRepository
  implements IBaseRepository<string, Promise<ClassroomModuleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomModuleModel> {
    return new ClassroomModuleMapper().toModel(
      await this.model.classroomModule.findUnique({
        where: { id }
      })
    );
  }
}
