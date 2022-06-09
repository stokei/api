import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsAdminsDTO } from '@/dtos/classrooms-admins/exists-classrooms-admins.dto';

@Injectable()
export class ExistsClassroomsAdminsRepository
  implements IBaseRepository<ExistsClassroomsAdminsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsAdminsDTO): Promise<boolean> {
    return (await this.model.classroomsAdmin.count({ where })) > 0;
  }
}
