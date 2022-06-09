import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CoursesStudentMapper } from '@/mappers/courses-students';
import { CoursesStudentModel } from '@/models/courses-student.model';

@Injectable()
export class FindCoursesStudentByIdRepository
  implements IBaseRepository<string, Promise<CoursesStudentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CoursesStudentModel> {
    return new CoursesStudentMapper().toModel(
      await this.model.coursesStudent.findUnique({
        where: { id }
      })
    );
  }
}
