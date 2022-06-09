import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateClassroomsModuleDTO } from '@/dtos/classrooms-modules/create-classrooms-module.dto';
import { ClassroomsModuleMapper } from '@/mappers/classrooms-modules';
import { ClassroomsModuleModel } from '@/models/classrooms-module.model';

@Injectable()
export class CreateClassroomsModuleRepository
  implements
    IBaseRepository<CreateClassroomsModuleDTO, Promise<ClassroomsModuleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateClassroomsModuleDTO
  ): Promise<ClassroomsModuleModel> {
    return new ClassroomsModuleMapper().toModel(
      await this.model.classroomsModule.create({ data })
    );
  }
}
