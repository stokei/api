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
import { CoursesStudentModel } from '@/models/courses-student.model';
import { FindAllCoursesStudentsQuery } from '@/queries/implements/courses-students/find-all-courses-students.query';
import { CountCoursesStudentsRepository } from '@/repositories/courses-students/count-courses-students';
import { FindAllCoursesStudentsRepository } from '@/repositories/courses-students/find-all-courses-students';

@QueryHandler(FindAllCoursesStudentsQuery)
export class FindAllCoursesStudentsQueryHandler
  implements IQueryHandler<FindAllCoursesStudentsQuery>
{
  constructor(
    private readonly findAllCoursesStudentRepository: FindAllCoursesStudentsRepository,
    private readonly countCoursesStudentsRepository: CountCoursesStudentsRepository
  ) {}

  async execute(
    query: FindAllCoursesStudentsQuery
  ): Promise<IPaginatedType<CoursesStudentModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const coursesStudents = await this.findAllCoursesStudentRepository.execute(
      data
    );
    const totalCount = await this.countCoursesStudentsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CoursesStudentModel>().toPaginationList({
      items: coursesStudents,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllCoursesStudentsQuery
  ): FindAllCoursesStudentsQuery {
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
        updatedAt: cleanSortValue(query.orderBy?.updatedAt)
      })
    };
  }
}
