import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCoursesStudentsDTO } from '@/dtos/courses-students/exists-courses-students.dto';

@Injectable()
export class ExistsCoursesStudentsRepository
  implements IBaseRepository<ExistsCoursesStudentsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCoursesStudentsDTO): Promise<boolean> {
    return (await this.model.coursesStudent.count({ where })) > 0;
  }
}
