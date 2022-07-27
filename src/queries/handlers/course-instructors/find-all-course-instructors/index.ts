import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CourseInstructorMapper } from '@/mappers/course-instructors';
import { CourseInstructorModel } from '@/models/course-instructor.model';
import { FindAllCourseInstructorsQuery } from '@/queries/implements/course-instructors/find-all-course-instructors.query';
import { CountCourseInstructorsRepository } from '@/repositories/course-instructors/count-course-instructors';
import { FindAllCourseInstructorsRepository } from '@/repositories/course-instructors/find-all-course-instructors';

@QueryHandler(FindAllCourseInstructorsQuery)
export class FindAllCourseInstructorsQueryHandler
  implements IQueryHandler<FindAllCourseInstructorsQuery>
{
  constructor(
    private readonly findAllCourseInstructorRepository: FindAllCourseInstructorsRepository,
    private readonly countCourseInstructorsRepository: CountCourseInstructorsRepository
  ) {}

  async execute(
    query: FindAllCourseInstructorsQuery
  ): Promise<IPaginatedType<CourseInstructorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new CourseInstructorMapper().toFindAllQueryClean(query);
    const courseInstructors =
      await this.findAllCourseInstructorRepository.execute(data);
    const totalCount = await this.countCourseInstructorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CourseInstructorModel>().toPaginationList({
      items: courseInstructors,
      page: data.page,
      totalCount
    });
  }
}
