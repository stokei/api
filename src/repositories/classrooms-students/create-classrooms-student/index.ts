import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ClassroomsStudentMapper } from '@/mappers/classrooms-students';
import { CreateClassroomsStudentDTO } from '@/dtos/classrooms-students/create-classrooms-student.dto';
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
