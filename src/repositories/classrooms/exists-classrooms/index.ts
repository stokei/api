import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsDTO } from '@/dtos/classrooms/exists-classrooms.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsClassroomsRepository
  implements IBaseRepository<ExistsClassroomsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsDTO): Promise<boolean> {
    return (await this.model.classroom.count({ where })) > 0;
  }
}
