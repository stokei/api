import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateClassroomsEnrollmentDTO } from '@/dtos/classrooms-enrollments/update-classrooms-enrollment.dto';

@Injectable()
export class UpdateClassroomsEnrollmentRepository
  implements IBaseRepository<UpdateClassroomsEnrollmentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: UpdateClassroomsEnrollmentDTO): Promise<boolean> {
    const updated = await this.model.classroomsEnrollment.update({
      where: {
        id: where?.classroomsEnrollmentId
      },
      data
    });
    return !!updated;
  }
}
