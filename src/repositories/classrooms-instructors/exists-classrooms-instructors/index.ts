import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsInstructorsDTO } from '@/dtos/classrooms-instructors/exists-classrooms-instructors.dto';

@Injectable()
export class ExistsClassroomsInstructorsRepository
  implements IBaseRepository<ExistsClassroomsInstructorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsInstructorsDTO): Promise<boolean> {
    return (await this.model.classroomsInstructor.count({ where })) > 0;
  }
}
