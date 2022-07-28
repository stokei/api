import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCourseInstructorsDTO } from '@/dtos/course-instructors/count-course-instructors.dto';
import { CourseInstructorMapper } from '@/mappers/course-instructors';

@Injectable()
export class CountCourseInstructorsRepository
  implements IBaseRepository<CountCourseInstructorsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCourseInstructorsDTO): Promise<number> {
    const courseInstructorMapper = new CourseInstructorMapper();
    return await this.model.courseInstructor.count({
      where: courseInstructorMapper.toWhereFindAllPrisma(where)
    });
  }
}
