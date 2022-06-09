import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsPlansDTO } from '@/dtos/classrooms-plans/exists-classrooms-plans.dto';

@Injectable()
export class ExistsClassroomsPlansRepository
  implements IBaseRepository<ExistsClassroomsPlansDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsPlansDTO): Promise<boolean> {
    return (await this.model.classroomsPlan.count({ where })) > 0;
  }
}
