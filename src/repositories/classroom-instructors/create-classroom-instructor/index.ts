import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateClassroomInstructorDTO } from '@/dtos/classroom-instructors/create-classroom-instructor.dto';
import { ClassroomInstructorMapper } from '@/mappers/classroom-instructors';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Injectable()
export class CreateClassroomInstructorRepository
  implements
    IBaseRepository<
      CreateClassroomInstructorDTO,
      Promise<ClassroomInstructorModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateClassroomInstructorDTO
  ): Promise<ClassroomInstructorModel> {
    return new ClassroomInstructorMapper().toModel(
      await this.model.classroomInstructor.create({ data })
    );
  }
}
