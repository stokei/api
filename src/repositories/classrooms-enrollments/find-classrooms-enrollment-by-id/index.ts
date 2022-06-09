import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomsEnrollmentMapper } from '@/mappers/classrooms-enrollments';
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';

@Injectable()
export class FindClassroomsEnrollmentByIdRepository
  implements IBaseRepository<string, Promise<ClassroomsEnrollmentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomsEnrollmentModel> {
    return new ClassroomsEnrollmentMapper().toModel(
      await this.model.classroomsEnrollment.findUnique({
        where: { id }
      })
    );
  }
}
