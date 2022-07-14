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

    const data = this.clearData(query);
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

  private clearData(
    query: FindAllCourseInstructorsQuery
  ): FindAllCourseInstructorsQuery {
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
          course: cleanWhereDataString(operatorData.course),
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
