import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveClassroomsInstructorDTO } from '@/dtos/classrooms-instructors/remove-classrooms-instructor.dto';

@Injectable()
export class RemoveClassroomsInstructorRepository
  implements IBaseRepository<RemoveClassroomsInstructorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomsInstructorDTO): Promise<boolean> {
    const removed = await this.model.classroomsInstructor.delete({
      where: {
        id: where?.classroomsInstructorId
      }
    });
    return !!removed;
  }
}
