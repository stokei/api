import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomsInstructorMapper } from '@/mappers/classrooms-instructors';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

@Injectable()
export class FindClassroomsInstructorByIdRepository
  implements IBaseRepository<string, Promise<ClassroomsInstructorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomsInstructorModel> {
    return new ClassroomsInstructorMapper().toModel(
      await this.model.classroomsInstructor.findUnique({
        where: { id }
      })
    );
  }
}
