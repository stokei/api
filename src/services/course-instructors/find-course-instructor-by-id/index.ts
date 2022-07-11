import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CourseInstructorModel } from '@/models/course-instructor.model';
import { FindCourseInstructorByIdQuery } from '@/queries/implements/course-instructors/find-course-instructor-by-id.query';

@Injectable()
export class FindCourseInstructorByIdService
  implements IBaseService<string, Promise<CourseInstructorModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CourseInstructorModel> {
    return await this.queryBus.execute(new FindCourseInstructorByIdQuery(data));
  }
}
