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

    const data = this.clearData(query);
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

  private clearData(query: FindAllCoursesQuery): FindAllCoursesQuery {
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
