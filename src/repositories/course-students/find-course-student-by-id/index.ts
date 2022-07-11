import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CourseStudentMapper } from '@/mappers/course-students';
import { CourseStudentModel } from '@/models/course-student.model';

@Injectable()
export class FindCourseStudentByIdRepository
  implements IBaseRepository<string, Promise<CourseStudentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CourseStudentModel> {
    return new CourseStudentMapper().toModel(
      await this.model.courseStudent.findUnique({
        where: { id }
      })
    );
  }
}
