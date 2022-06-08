import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  CourseNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CourseModel } from '@/models/course.model';
import { FindCourseByIdRepository } from '@/repositories/courses/find-course-by-id';
import { FindCourseByIdQuery } from '@/queries/implements/courses/find-course-by-id.query';

@QueryHandler(FindCourseByIdQuery)
export class FindCourseByIdQueryHandler
  implements IQueryHandler<FindCourseByIdQuery>
{
  constructor(
    private readonly findCourseByIdRepository: FindCourseByIdRepository
  ) {}

  async execute(query: FindCourseByIdQuery): Promise<CourseModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const course = await this.findCourseByIdRepository.execute(id);
    if (!course) {
      throw new CourseNotFoundException();
    }
    return course;
  }
}
