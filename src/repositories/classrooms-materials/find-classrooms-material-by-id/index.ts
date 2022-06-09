import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomsMaterialMapper } from '@/mappers/classrooms-materials';
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';

@Injectable()
export class FindClassroomsMaterialByIdRepository
  implements IBaseRepository<string, Promise<ClassroomsMaterialModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomsMaterialModel> {
    return new ClassroomsMaterialMapper().toModel(
      await this.model.classroomsMaterial.findUnique({
        where: { id }
      })
    );
  }
}
