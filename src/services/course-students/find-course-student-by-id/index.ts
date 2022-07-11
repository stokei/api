import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CourseStudentModel } from '@/models/course-student.model';
import { FindCourseStudentByIdQuery } from '@/queries/implements/course-students/find-course-student-by-id.query';

@Injectable()
export class FindCourseStudentByIdService
  implements IBaseService<string, Promise<CourseStudentModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CourseStudentModel> {
    return await this.queryBus.execute(new FindCourseStudentByIdQuery(data));
  }
}
