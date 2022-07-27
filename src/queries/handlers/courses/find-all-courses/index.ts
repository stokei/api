import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CourseMapper } from '@/mappers/courses';
import { CourseModel } from '@/models/course.model';
import { FindAllCoursesQuery } from '@/queries/implements/courses/find-all-courses.query';
import { CountCoursesRepository } from '@/repositories/courses/count-courses';
import { FindAllCoursesRepository } from '@/repositories/courses/find-all-courses';

@QueryHandler(FindAllCoursesQuery)
export class FindAllCoursesQueryHandler
  implements IQueryHandler<FindAllCoursesQuery>
{
  constructor(
    private readonly findAllCourseRepository: FindAllCoursesRepository,
    private readonly countCoursesRepository: CountCoursesRepository
  ) {}

  async execute(
    query: FindAllCoursesQuery
  ): Promise<IPaginatedType<CourseModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new CourseMapper().toFindAllQueryClean(query);
    const courses = await this.findAllCourseRepository.execute(data);
    const totalCount = await this.countCoursesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CourseModel>().toPaginationList({
      items: courses,
      page: data.page,
      totalCount
    });
  }
}
