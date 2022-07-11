import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomStudentMapper } from '@/mappers/classroom-students';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Injectable()
export class FindClassroomStudentByIdRepository
  implements IBaseRepository<string, Promise<ClassroomStudentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomStudentModel> {
    return new ClassroomStudentMapper().toModel(
      await this.model.classroomStudent.findUnique({
        where: { id }
      })
    );
  }
}
