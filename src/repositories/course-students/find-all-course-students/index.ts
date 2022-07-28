import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllCourseStudentsDTO } from '@/dtos/course-students/find-all-course-students.dto';
import { CourseStudentMapper } from '@/mappers/course-students';
import { CourseStudentModel } from '@/models/course-student.model';

@Injectable()
export class FindAllCourseStudentsRepository
  implements
    IBaseRepository<FindAllCourseStudentsDTO, Promise<CourseStudentModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllCourseStudentsDTO): Promise<CourseStudentModel[]> {
    const courseStudentMapper = new CourseStudentMapper();
    return courseStudentMapper.toModels(
      await this.model.courseStudent.findMany(
        courseStudentMapper.toFindAllPrisma(data)
      )
    );
  }
}
