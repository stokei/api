import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsDTO } from '@/dtos/classrooms/exists-classrooms.dto';

@Injectable()
export class ExistsClassroomsRepository
  implements IBaseRepository<ExistsClassroomsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsDTO): Promise<boolean> {
    return (await this.model.classroom.count({ where })) > 0;
  }
}
