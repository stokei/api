import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CourseMapper } from '@/mappers/courses';
import { CourseModel } from '@/models/course.model';

@Injectable()
export class FindCourseByIdRepository
  implements IBaseRepository<string, Promise<CourseModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CourseModel> {
    return new CourseMapper().toModel(
      await this.model.course.findUnique({
        where: { id }
      })
    );
  }
}
