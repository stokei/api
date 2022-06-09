import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCoursesInstructorDTO } from '@/dtos/courses-instructors/create-courses-instructor.dto';
import { CoursesInstructorMapper } from '@/mappers/courses-instructors';
import { CoursesInstructorModel } from '@/models/courses-instructor.model';

@Injectable()
export class CreateCoursesInstructorRepository
  implements
    IBaseRepository<
      CreateCoursesInstructorDTO,
      Promise<CoursesInstructorModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateCoursesInstructorDTO
  ): Promise<CoursesInstructorModel> {
    return new CoursesInstructorMapper().toModel(
      await this.model.coursesInstructor.create({ data })
    );
  }
}
