import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCoursesDTO } from '@/dtos/courses/find-all-courses.dto';
import { CourseMapper } from '@/mappers/courses';
import { CourseModel } from '@/models/course.model';

@Injectable()
export class FindAllCoursesRepository
  implements IBaseRepository<FindAllCoursesDTO, Promise<CourseModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCoursesDTO): Promise<CourseModel[]> {
    const courseMapper = new CourseMapper();
    return courseMapper.toModels(
      await this.model.course.findMany(courseMapper.toFindAllPrisma(data))
    );
  }
}
