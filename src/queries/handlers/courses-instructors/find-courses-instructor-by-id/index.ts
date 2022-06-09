import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CoursesInstructorNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CoursesInstructorModel } from '@/models/courses-instructor.model';
import { FindCoursesInstructorByIdQuery } from '@/queries/implements/courses-instructors/find-courses-instructor-by-id.query';
import { FindCoursesInstructorByIdRepository } from '@/repositories/courses-instructors/find-courses-instructor-by-id';

@QueryHandler(FindCoursesInstructorByIdQuery)
export class FindCoursesInstructorByIdQueryHandler
  implements IQueryHandler<FindCoursesInstructorByIdQuery>
{
  constructor(
    private readonly findCoursesInstructorByIdRepository: FindCoursesInstructorByIdRepository
  ) {}

  async execute(
    query: FindCoursesInstructorByIdQuery
  ): Promise<CoursesInstructorModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const coursesInstructor =
      await this.findCoursesInstructorByIdRepository.execute(id);
    if (!coursesInstructor) {
      throw new CoursesInstructorNotFoundException();
    }
    return coursesInstructor;
  }
}
