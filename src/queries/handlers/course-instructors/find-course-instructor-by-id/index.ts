import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CourseInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CourseInstructorModel } from '@/models/course-instructor.model';
import { FindCourseInstructorByIdQuery } from '@/queries/implements/course-instructors/find-course-instructor-by-id.query';
import { FindCourseInstructorByIdRepository } from '@/repositories/course-instructors/find-course-instructor-by-id';

@QueryHandler(FindCourseInstructorByIdQuery)
export class FindCourseInstructorByIdQueryHandler
  implements IQueryHandler<FindCourseInstructorByIdQuery>
{
  constructor(
    private readonly findCourseInstructorByIdRepository: FindCourseInstructorByIdRepository
  ) {}

  async execute(
    query: FindCourseInstructorByIdQuery
  ): Promise<CourseInstructorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const courseInstructor =
      await this.findCourseInstructorByIdRepository.execute(id);
    if (!courseInstructor) {
      throw new CourseInstructorNotFoundException();
    }
    return courseInstructor;
  }
}
