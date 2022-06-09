import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsMaterialsDTO } from '@/dtos/classrooms-materials/exists-classrooms-materials.dto';

@Injectable()
export class ExistsClassroomsMaterialsRepository
  implements IBaseRepository<ExistsClassroomsMaterialsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsMaterialsDTO): Promise<boolean> {
    return (await this.model.classroomsMaterial.count({ where })) > 0;
  }
}
