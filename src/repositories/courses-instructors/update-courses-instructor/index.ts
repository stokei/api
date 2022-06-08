import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateCoursesInstructorDTO } from '@/dtos/courses-instructors/update-courses-instructor.dto';

@Injectable()
export class UpdateCoursesInstructorRepository
  implements IBaseRepository<UpdateCoursesInstructorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCoursesInstructorDTO): Promise<boolean> {
    const updated = await this.model.coursesInstructor.update({
      where: {
        id: where?.coursesInstructorId
      },
      data
    });
    return !!updated;
  }
}
