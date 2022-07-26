import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCourseInstructorDTO } from '@/dtos/course-instructors/remove-course-instructor.dto';

@Injectable()
export class RemoveCourseInstructorRepository
  implements IBaseRepository<RemoveCourseInstructorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCourseInstructorDTO): Promise<boolean> {
    const removed = await this.model.courseInstructor.deleteMany({
      where: {
        app: where?.app,
        course: where?.course,
        instructor: where?.instructor
      }
    });
    return removed?.count > 0;
  }
}
