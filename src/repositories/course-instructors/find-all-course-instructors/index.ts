import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCourseInstructorsDTO } from '@/dtos/course-instructors/find-all-course-instructors.dto';
import { CourseInstructorMapper } from '@/mappers/course-instructors';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Injectable()
export class FindAllCourseInstructorsRepository
  implements
    IBaseRepository<
      FindAllCourseInstructorsDTO,
      Promise<CourseInstructorModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllCourseInstructorsDTO
  ): Promise<CourseInstructorModel[]> {
    const courseInstructorMapper = new CourseInstructorMapper();
    return courseInstructorMapper.toModels(
      await this.model.courseInstructor.findMany(
        courseInstructorMapper.toFindAllPrisma(data)
      )
    );
  }
}
