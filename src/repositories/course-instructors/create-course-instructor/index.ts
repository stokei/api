import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCourseInstructorDTO } from '@/dtos/course-instructors/create-course-instructor.dto';
import { CourseInstructorMapper } from '@/mappers/course-instructors';
import { CourseInstructorModel } from '@/models/course-instructor.model';

@Injectable()
export class CreateCourseInstructorRepository
  implements
    IBaseRepository<CreateCourseInstructorDTO, Promise<CourseInstructorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateCourseInstructorDTO
  ): Promise<CourseInstructorModel> {
    return new CourseInstructorMapper().toModel(
      await this.model.courseInstructor.create({ data })
    );
  }
}
