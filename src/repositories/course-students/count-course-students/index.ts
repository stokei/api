import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountCourseStudentsDTO } from '@/dtos/course-students/count-course-students.dto';
import { CourseStudentMapper } from '@/mappers/course-students';

@Injectable()
export class CountCourseStudentsRepository
  implements IBaseRepository<CountCourseStudentsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountCourseStudentsDTO): Promise<number> {
    const courseStudentMapper = new CourseStudentMapper();
    return await this.model.courseStudent.count({
      where: courseStudentMapper.toWhereFindAllPrisma(where)
    });
  }
}
