import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomsStudentMapper } from '@/mappers/classrooms-students';
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

@Injectable()
export class FindClassroomsStudentByIdRepository
  implements IBaseRepository<string, Promise<ClassroomsStudentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomsStudentModel> {
    return new ClassroomsStudentMapper().toModel(
      await this.model.classroomsStudent.findUnique({
        where: { id }
      })
    );
  }
}
