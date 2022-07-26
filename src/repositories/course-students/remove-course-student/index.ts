import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveCourseStudentDTO } from '@/dtos/course-students/remove-course-student.dto';

@Injectable()
export class RemoveCourseStudentRepository
  implements IBaseRepository<RemoveCourseStudentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCourseStudentDTO): Promise<boolean> {
    const removed = await this.model.courseStudent.deleteMany({
      where: {
        app: where?.app,
        course: where?.course,
        student: where?.student
      }
    });
    return removed?.count > 0;
  }
}
