import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateClassroomsStudentDTO } from '@/dtos/classrooms-students/create-classrooms-student.dto';
import { ClassroomsStudentMapper } from '@/mappers/classrooms-students';
import { ClassroomsStudentModel } from '@/models/classrooms-student.model';

@Injectable()
export class CreateClassroomsStudentRepository
  implements
    IBaseRepository<
      CreateClassroomsStudentDTO,
      Promise<ClassroomsStudentModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateClassroomsStudentDTO
  ): Promise<ClassroomsStudentModel> {
    return new ClassroomsStudentMapper().toModel(
      await this.model.classroomsStudent.create({ data })
    );
  }
}
