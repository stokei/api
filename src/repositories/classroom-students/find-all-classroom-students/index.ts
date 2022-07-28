import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomStudentsDTO } from '@/dtos/classroom-students/find-all-classroom-students.dto';
import { ClassroomStudentMapper } from '@/mappers/classroom-students';
import { ClassroomStudentModel } from '@/models/classroom-student.model';

@Injectable()
export class FindAllClassroomStudentsRepository
  implements
    IBaseRepository<
      FindAllClassroomStudentsDTO,
      Promise<ClassroomStudentModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomStudentsDTO
  ): Promise<ClassroomStudentModel[]> {
    const classroomStudentMapper = new ClassroomStudentMapper();
    return classroomStudentMapper.toModels(
      await this.model.classroomStudent.findMany(
        classroomStudentMapper.toFindAllPrisma(data)
      )
    );
  }
}
