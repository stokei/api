import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CoursesStudentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CoursesStudentModel } from '@/models/courses-student.model';
import { FindCoursesStudentByIdQuery } from '@/queries/implements/courses-students/find-courses-student-by-id.query';
import { FindCoursesStudentByIdRepository } from '@/repositories/courses-students/find-courses-student-by-id';

@QueryHandler(FindCoursesStudentByIdQuery)
export class FindCoursesStudentByIdQueryHandler
  implements IQueryHandler<FindCoursesStudentByIdQuery>
{
  constructor(
    private readonly findCoursesStudentByIdRepository: FindCoursesStudentByIdRepository
  ) {}

  async execute(
    query: FindCoursesStudentByIdQuery
  ): Promise<CoursesStudentModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const coursesStudent = await this.findCoursesStudentByIdRepository.execute(
      id
    );
    if (!coursesStudent) {
      throw new CoursesStudentNotFoundException();
    }
    return coursesStudent;
  }
}
