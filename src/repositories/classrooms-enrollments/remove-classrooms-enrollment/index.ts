import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveClassroomsEnrollmentDTO } from '@/dtos/classrooms-enrollments/remove-classrooms-enrollment.dto';

@Injectable()
export class RemoveClassroomsEnrollmentRepository
  implements IBaseRepository<RemoveClassroomsEnrollmentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomsEnrollmentDTO): Promise<boolean> {
    const removed = await this.model.classroomsEnrollment.delete({
      where: {
        id: where?.classroomsEnrollmentId
      }
    });
    return !!removed;
  }
}
