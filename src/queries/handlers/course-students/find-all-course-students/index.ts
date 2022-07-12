import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanSortValue,
  cleanValue,
  cleanValueNumber,
  cleanWhereDataSearch,
  cleanWhereDataString,
  IOperator,
  IPaginatedType,
  PaginationMapper,
  splitServiceId
} from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
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

    const data = this.clearData(query);
    const courseStudents = await this.findAllCourseStudentRepository.execute(
      data
    );
    const totalCount = await this.countCourseStudentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CourseStudentModel>().toPaginationList({
      items: courseStudents,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllCourseStudentsQuery
  ): FindAllCourseStudentsQuery {
    if (!query) {
      return null;
    }
    const clearWhereOperatorData = (operator: IOperator) => {
      const operatorData = query?.where?.[operator];
      if (!operatorData) {
        return null;
      }
      return {
        [operator]: {
          parent: cleanWhereDataString(operatorData.parent),
          name: cleanWhereDataSearch(operatorData.name),
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
          ids:
            operatorData.ids?.length > 0
              ? operatorData.ids.map((id) => splitServiceId(cleanValue(id))?.id)
              : undefined
        }
      };
    };
    return {
      ...query,
      where: {
        ...cleanObject(clearWhereOperatorData('AND')),
        ...cleanObject(clearWhereOperatorData('OR')),
        ...cleanObject(clearWhereOperatorData('NOT'), true)
      },
      page: cleanObject({
        limit: cleanValueNumber(query.page?.limit),
        number: cleanValueNumber(query.page?.number)
      }),
      orderBy: cleanObject({
        name: cleanSortValue(query.orderBy?.name),
        createdAt: cleanSortValue(query.orderBy?.createdAt),
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}
