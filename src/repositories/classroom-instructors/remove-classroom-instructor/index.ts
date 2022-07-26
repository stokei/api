import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveClassroomInstructorDTO } from '@/dtos/classroom-instructors/remove-classroom-instructor.dto';

@Injectable()
export class RemoveClassroomInstructorRepository
  implements IBaseRepository<RemoveClassroomInstructorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomInstructorDTO): Promise<boolean> {
    const removed = await this.model.classroomInstructor.deleteMany({
      where: {
        app: where?.app,
        classroom: where?.classroom,
        instructor: where?.instructor
      }
    });
    return removed?.count > 0;
  }
}
