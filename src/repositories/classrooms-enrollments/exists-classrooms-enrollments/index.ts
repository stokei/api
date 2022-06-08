import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsEnrollmentsDTO } from '@/dtos/classrooms-enrollments/exists-classrooms-enrollments.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsClassroomsEnrollmentsRepository
  implements IBaseRepository<ExistsClassroomsEnrollmentsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsEnrollmentsDTO): Promise<boolean> {
    return (await this.model.classroomsEnrollment.count({ where })) > 0;
  }
}
