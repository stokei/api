import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsEnrollmentsDTO } from '@/dtos/classrooms-enrollments/exists-classrooms-enrollments.dto';

@Injectable()
export class ExistsClassroomsEnrollmentsRepository
  implements IBaseRepository<ExistsClassroomsEnrollmentsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsEnrollmentsDTO): Promise<boolean> {
    return (await this.model.classroomsEnrollment.count({ where })) > 0;
  }
}
