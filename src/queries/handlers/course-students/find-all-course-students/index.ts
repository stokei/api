import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CourseStudentMapper } from '@/mappers/course-students';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindAllCourseStudentsQuery } from '@/queries/implements/course-students/find-all-course-students.query';
import { CountCourseStudentsRepository } from '@/repositories/course-students/count-course-students';
import { FindAllCourseStudentsRepository } from '@/repositories/course-students/find-all-course-students';

@QueryHandler(FindAllCourseStudentsQuery)
export class FindAllCourseStudentsQueryHandler
  implements IQueryHandler<FindAllCourseStudentsQuery>
{
  constructor(
    private readonly findAllCourseStudentRepository: FindAllCourseStudentsRepository,
    private readonly countCourseStudentsRepository: CountCourseStudentsRepository
  ) {}

  async execute(
    query: FindAllCourseStudentsQuery
  ): Promise<IPaginatedType<CourseStudentModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new CourseStudentMapper().toFindAllQueryClean(query);
    const courseStudents =
      await this.findAllCourseStudentRepository.execute(data);
    const totalCount = await this.countCourseStudentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CourseStudentModel>().toPaginationList({
      items: courseStudents,
      page: data.page,
      totalCount
    });
  }
}
