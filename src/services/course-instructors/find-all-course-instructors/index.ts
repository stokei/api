import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllCourseInstructorsDTO } from '@/dtos/course-instructors/find-all-course-instructors.dto';
import { CourseInstructorModel } from '@/models/course-instructor.model';
import { FindAllCourseInstructorsQuery } from '@/queries/implements/course-instructors/find-all-course-instructors.query';

@Injectable()
export class FindAllCourseInstructorsService
  implements
    IBaseService<
      FindAllCourseInstructorsDTO,
      Promise<IPaginatedType<CourseInstructorModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCourseInstructorsDTO
  ): Promise<IPaginatedType<CourseInstructorModel>> {
    return await this.queryBus.execute(new FindAllCourseInstructorsQuery(data));
  }
}
