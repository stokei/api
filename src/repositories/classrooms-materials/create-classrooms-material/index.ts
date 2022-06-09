import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateClassroomsMaterialDTO } from '@/dtos/classrooms-materials/create-classrooms-material.dto';
import { ClassroomsMaterialMapper } from '@/mappers/classrooms-materials';
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';

@Injectable()
export class CreateClassroomsMaterialRepository
  implements
    IBaseRepository<
      CreateClassroomsMaterialDTO,
      Promise<ClassroomsMaterialModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateClassroomsMaterialDTO
  ): Promise<ClassroomsMaterialModel> {
    return new ClassroomsMaterialMapper().toModel(
      await this.model.classroomsMaterial.create({ data })
    );
  }
}
