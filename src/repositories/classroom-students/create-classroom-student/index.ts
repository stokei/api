import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateClassroomStudentDTO } from '@/dtos/classroom-students/create-classroom-student.dto';
import { ClassroomStudentMapper } from '@/mappers/classroom-students';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Injectable()
export class CreateClassroomStudentRepository
  implements
    IBaseRepository<CreateClassroomStudentDTO, Promise<ClassroomStudentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateClassroomStudentDTO
  ): Promise<ClassroomStudentModel> {
    return new ClassroomStudentMapper().toModel(
      await this.model.classroomStudent.create({ data })
    );
  }
}
