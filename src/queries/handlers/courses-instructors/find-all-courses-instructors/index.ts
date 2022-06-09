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
import { CoursesInstructorModel } from '@/models/courses-instructor.model';
import { FindAllCoursesInstructorsQuery } from '@/queries/implements/courses-instructors/find-all-courses-instructors.query';
import { CountCoursesInstructorsRepository } from '@/repositories/courses-instructors/count-courses-instructors';
import { FindAllCoursesInstructorsRepository } from '@/repositories/courses-instructors/find-all-courses-instructors';

@QueryHandler(FindAllCoursesInstructorsQuery)
export class FindAllCoursesInstructorsQueryHandler
  implements IQueryHandler<FindAllCoursesInstructorsQuery>
{
  constructor(
    private readonly findAllCoursesInstructorRepository: FindAllCoursesInstructorsRepository,
    private readonly countCoursesInstructorsRepository: CountCoursesInstructorsRepository
  ) {}

  async execute(
    query: FindAllCoursesInstructorsQuery
  ): Promise<IPaginatedType<CoursesInstructorModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const coursesInstructors =
      await this.findAllCoursesInstructorRepository.execute(data);
    const totalCount = await this.countCoursesInstructorsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CoursesInstructorModel>().toPaginationList({
      items: coursesInstructors,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllCoursesInstructorsQuery
  ): FindAllCoursesInstructorsQuery {
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
