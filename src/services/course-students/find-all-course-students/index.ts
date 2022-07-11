import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCourseStudentsDTO } from '@/dtos/course-students/find-all-course-students.dto';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindAllCourseStudentsQuery } from '@/queries/implements/course-students/find-all-course-students.query';

@Injectable()
export class FindAllCourseStudentsService
  implements
    IBaseService<
      FindAllCourseStudentsDTO,
      Promise<IPaginatedType<CourseStudentModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCourseStudentsDTO
  ): Promise<IPaginatedType<CourseStudentModel>> {
    return await this.queryBus.execute(new FindAllCourseStudentsQuery(data));
  }
}
