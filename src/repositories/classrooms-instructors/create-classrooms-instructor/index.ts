import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ClassroomsInstructorMapper } from '@/mappers/classrooms-instructors';
import { CreateClassroomsInstructorDTO } from '@/dtos/classrooms-instructors/create-classrooms-instructor.dto';
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
