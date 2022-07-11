import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CourseInstructorMapper } from '@/mappers/course-instructors';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Injectable()
export class FindCourseInstructorByIdRepository
  implements IBaseRepository<string, Promise<CourseInstructorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CourseInstructorModel> {
    return new CourseInstructorMapper().toModel(
      await this.model.courseInstructor.findUnique({
        where: { id }
      })
    );
  }
}
