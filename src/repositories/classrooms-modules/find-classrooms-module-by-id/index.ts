import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomsModuleMapper } from '@/mappers/classrooms-modules';
import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

@Injectable()
export class FindClassroomsModuleByIdRepository
  implements IBaseRepository<string, Promise<ClassroomsModuleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomsModuleModel> {
    return new ClassroomsModuleMapper().toModel(
      await this.model.classroomsModule.findUnique({
        where: { id }
      })
    );
  }
}
