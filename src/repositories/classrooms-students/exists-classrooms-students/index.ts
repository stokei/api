import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomsStudentsDTO } from '@/dtos/classrooms-students/exists-classrooms-students.dto';

@Injectable()
export class ExistsClassroomsStudentsRepository
  implements IBaseRepository<ExistsClassroomsStudentsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomsStudentsDTO): Promise<boolean> {
    return (await this.model.classroomsStudent.count({ where })) > 0;
  }
}
