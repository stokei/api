import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCoursesInstructorDTO } from '@/dtos/courses-instructors/remove-courses-instructor.dto';

@Injectable()
export class RemoveCoursesInstructorRepository
  implements IBaseRepository<RemoveCoursesInstructorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCoursesInstructorDTO): Promise<boolean> {
    const removed = await this.model.coursesInstructor.delete({
      where: {
        id: where?.coursesInstructorId
      }
    });
    return !!removed;
  }
}
