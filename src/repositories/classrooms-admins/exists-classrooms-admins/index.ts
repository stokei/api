import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsAdminsDTO } from '@/dtos/classrooms-admins/exists-classrooms-admins.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsClassroomsAdminsRepository
  implements IBaseRepository<ExistsClassroomsAdminsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsAdminsDTO): Promise<boolean> {
    return (await this.model.classroomsAdmin.count({ where })) > 0;
  }
}
