import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CourseStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindCourseStudentByIdQuery } from '@/queries/implements/course-students/find-course-student-by-id.query';
import { FindCourseStudentByIdRepository } from '@/repositories/course-students/find-course-student-by-id';

@QueryHandler(FindCourseStudentByIdQuery)
export class FindCourseStudentByIdQueryHandler
  implements IQueryHandler<FindCourseStudentByIdQuery>
{
  constructor(
    private readonly findCourseStudentByIdRepository: FindCourseStudentByIdRepository
  ) {}

  async execute(
    query: FindCourseStudentByIdQuery
  ): Promise<CourseStudentModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const courseStudent = await this.findCourseStudentByIdRepository.execute(
      id
    );
    if (!courseStudent) {
      throw new CourseStudentNotFoundException();
    }
    return courseStudent;
  }
}
