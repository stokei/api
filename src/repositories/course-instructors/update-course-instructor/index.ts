import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateCourseInstructorDTO } from '@/dtos/course-instructors/update-course-instructor.dto';

@Injectable()
export class UpdateCourseInstructorRepository
  implements IBaseRepository<UpdateCourseInstructorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCourseInstructorDTO): Promise<boolean> {
    const updated = await this.model.courseInstructor.update({
      where: {
        id: where?.courseInstructorId
      },
      data
    });
    return !!updated;
  }
}
