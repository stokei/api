import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomInstructorMapper } from '@/mappers/classroom-instructors';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Injectable()
export class FindClassroomInstructorByIdRepository
  implements IBaseRepository<string, Promise<ClassroomInstructorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomInstructorModel> {
    return new ClassroomInstructorMapper().toModel(
      await this.model.classroomInstructor.findUnique({
        where: { id }
      })
    );
  }
}
