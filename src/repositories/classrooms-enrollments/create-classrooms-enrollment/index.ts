import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ClassroomsEnrollmentMapper } from '@/mappers/classrooms-enrollments';
import { CreateClassroomsEnrollmentDTO } from '@/dtos/classrooms-enrollments/create-classrooms-enrollment.dto';
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';

@Injectable()
export class CreateClassroomsEnrollmentRepository
  implements
    IBaseRepository<
      CreateClassroomsEnrollmentDTO,
      Promise<ClassroomsEnrollmentModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateClassroomsEnrollmentDTO
  ): Promise<ClassroomsEnrollmentModel> {
    return new ClassroomsEnrollmentMapper().toModel(
      await this.model.classroomsEnrollment.create({ data })
    );
  }
}
