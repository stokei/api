import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import {
  CourseStudentNotFoundException,
  DataNotFoundException
} from '@/errors';
import { CourseStudentModel } from '@/models/course-student.model';
import { FindCourseStudentByCourseAndStudentQuery } from '@/queries/implements/course-students/find-course-student-by-course-and-student.query';
import { FindCourseStudentByCourseAndStudentRepository } from '@/repositories/course-students/find-course-student-by-course-and-student';

@QueryHandler(FindCourseStudentByCourseAndStudentQuery)
export class FindCourseStudentByCourseAndStudentQueryHandler
  implements IQueryHandler<FindCourseStudentByCourseAndStudentQuery>
{
  constructor(
    private readonly findCourseStudentByCourseAndStudentRepository: FindCourseStudentByCourseAndStudentRepository
  ) {}

  async execute(
    query: FindCourseStudentByCourseAndStudentQuery
  ): Promise<CourseStudentModel> {
    const data = this.cleanData(query);
    if (!data) {
      throw new DataNotFoundException();
    }

    const courseStudent =
      await this.findCourseStudentByCourseAndStudentRepository.execute(data);
    if (!courseStudent) {
      throw new CourseStudentNotFoundException();
    }
    return courseStudent;
  }

  private cleanData(
    data: FindCourseStudentByCourseAndStudentQuery
  ): FindCourseStudentByCourseAndStudentQuery {
    return cleanObject({
      course: cleanValue(data?.course),
      student: cleanValue(data?.student)
    });
  }
}
