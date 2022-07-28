import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCoursesDTO } from '@/dtos/courses/count-courses.dto';
import { CourseMapper } from '@/mappers/courses';

@Injectable()
export class CountCoursesRepository
  implements IBaseRepository<CountCoursesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCoursesDTO): Promise<number> {
    const courseMapper = new CourseMapper();
    return await this.model.course.count({
      where: courseMapper.toWhereFindAllPrisma(where)
    });
  }
}
