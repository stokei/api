import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateClassroomModuleDTO } from '@/dtos/classroom-modules/create-classroom-module.dto';
import { ClassroomModuleMapper } from '@/mappers/classroom-modules';
import { ClassroomModuleModel } from '@/models/classroom-module.model';

@Injectable()
export class CreateClassroomModuleRepository
  implements
    IBaseRepository<CreateClassroomModuleDTO, Promise<ClassroomModuleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateClassroomModuleDTO): Promise<ClassroomModuleModel> {
    return new ClassroomModuleMapper().toModel(
      await this.model.classroomModule.create({ data })
    );
  }
}
