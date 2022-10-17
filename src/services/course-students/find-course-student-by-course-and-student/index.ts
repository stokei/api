import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { FindCourseStudentByCourseAndStudentDTO } from '@/dtos/course-students/find-course-student-by-course-and-student.dto';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindCourseStudentByCourseAndStudentQuery } from '@/queries/implements/course-students/find-course-student-by-course-and-student.query';

@Injectable()
export class FindCourseStudentByCourseAndStudentService
  implements
    IBaseService<
      FindCourseStudentByCourseAndStudentDTO,
      Promise<CourseStudentModel>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindCourseStudentByCourseAndStudentDTO
  ): Promise<CourseStudentModel> {
    return await this.queryBus.execute(
      new FindCourseStudentByCourseAndStudentQuery(data)
    );
  }
}
