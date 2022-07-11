import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsClassroomStudentsDTO } from '@/dtos/classroom-students/exists-classroom-students.dto';

@Injectable()
export class ExistsClassroomStudentsRepository
  implements IBaseRepository<ExistsClassroomStudentsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsClassroomStudentsDTO): Promise<boolean> {
    return (await this.model.classroomStudent.count({ where })) > 0;
  }
}
