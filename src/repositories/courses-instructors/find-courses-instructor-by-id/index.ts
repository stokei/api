import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CoursesInstructorMapper } from '@/mappers/courses-instructors';
import { CoursesInstructorModel } from '@/models/courses-instructor.model';

@Injectable()
export class FindCoursesInstructorByIdRepository
  implements IBaseRepository<string, Promise<CoursesInstructorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CoursesInstructorModel> {
    return new CoursesInstructorMapper().toModel(
      await this.model.coursesInstructor.findUnique({
        where: { id }
      })
    );
  }
}
