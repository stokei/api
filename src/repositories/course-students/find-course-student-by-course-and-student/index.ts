import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindCourseStudentByCourseAndStudentDTO } from '@/dtos/course-students/find-course-student-by-course-and-student.dto';
import { CourseStudentMapper } from '@/mappers/course-students';
import { CourseStudentModel } from '@/models/course-student.model';

@Injectable()
export class FindCourseStudentByCourseAndStudentRepository
  implements
    IBaseRepository<
      FindCourseStudentByCourseAndStudentDTO,
      Promise<CourseStudentModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    course,
    student
  }: FindCourseStudentByCourseAndStudentDTO): Promise<CourseStudentModel> {
    return new CourseStudentMapper().toModel(
      await this.model.courseStudent.findFirst({
        where: { course, student }
      })
    );
  }
}
