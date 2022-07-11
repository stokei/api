import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCourseStudentsDTO } from '@/dtos/course-students/exists-course-students.dto';

@Injectable()
export class ExistsCourseStudentsRepository
  implements IBaseRepository<ExistsCourseStudentsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCourseStudentsDTO): Promise<boolean> {
    return (await this.model.courseStudent.count({ where })) > 0;
  }
}
