import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateClassroomsInstructorDTO } from '@/dtos/classrooms-instructors/create-classrooms-instructor.dto';
import { ClassroomsInstructorMapper } from '@/mappers/classrooms-instructors';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';

@Injectable()
export class CreateClassroomsInstructorRepository
  implements
    IBaseRepository<
      CreateClassroomsInstructorDTO,
      Promise<ClassroomsInstructorModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateClassroomsInstructorDTO
  ): Promise<ClassroomsInstructorModel> {
    return new ClassroomsInstructorMapper().toModel(
      await this.model.classroomsInstructor.create({ data })
    );
  }
}
