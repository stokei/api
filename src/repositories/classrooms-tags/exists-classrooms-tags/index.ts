import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsTagsDTO } from '@/dtos/classrooms-tags/exists-classrooms-tags.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsClassroomsTagsRepository
  implements IBaseRepository<ExistsClassroomsTagsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsTagsDTO): Promise<boolean> {
    return (await this.model.classroomsTag.count({ where })) > 0;
  }
}
