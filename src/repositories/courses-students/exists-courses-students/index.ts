import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCoursesStudentsDTO } from '@/dtos/courses-students/exists-courses-students.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCoursesStudentsRepository
  implements IBaseRepository<ExistsCoursesStudentsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCoursesStudentsDTO): Promise<boolean> {
    return (await this.model.coursesStudent.count({ where })) > 0;
  }
}
