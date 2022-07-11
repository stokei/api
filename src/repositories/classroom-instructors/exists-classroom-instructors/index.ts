import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomInstructorsDTO } from '@/dtos/classroom-instructors/exists-classroom-instructors.dto';

@Injectable()
export class ExistsClassroomInstructorsRepository
  implements IBaseRepository<ExistsClassroomInstructorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomInstructorsDTO): Promise<boolean> {
    return (await this.model.classroomInstructor.count({ where })) > 0;
  }
}
