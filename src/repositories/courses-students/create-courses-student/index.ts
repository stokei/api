import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCoursesStudentDTO } from '@/dtos/courses-students/create-courses-student.dto';
import { CoursesStudentMapper } from '@/mappers/courses-students';
import { CoursesStudentModel } from '@/models/courses-student.model';

@Injectable()
export class CreateCoursesStudentRepository
  implements
    IBaseRepository<CreateCoursesStudentDTO, Promise<CoursesStudentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCoursesStudentDTO): Promise<CoursesStudentModel> {
    return new CoursesStudentMapper().toModel(
      await this.model.coursesStudent.create({ data })
    );
  }
}
