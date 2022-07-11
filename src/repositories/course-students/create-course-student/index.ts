import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCourseStudentDTO } from '@/dtos/course-students/create-course-student.dto';
import { CourseStudentMapper } from '@/mappers/course-students';
import { CourseStudentModel } from '@/models/course-student.model';

@Injectable()
export class CreateCourseStudentRepository
  implements
    IBaseRepository<CreateCourseStudentDTO, Promise<CourseStudentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCourseStudentDTO): Promise<CourseStudentModel> {
    return new CourseStudentMapper().toModel(
      await this.model.courseStudent.create({ data })
    );
  }
}
