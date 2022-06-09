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
import { CoursesAdminModel } from '@/models/courses-admin.model';
import { FindAllCoursesAdminsQuery } from '@/queries/implements/courses-admins/find-all-courses-admins.query';
import { CountCoursesAdminsRepository } from '@/repositories/courses-admins/count-courses-admins';
import { FindAllCoursesAdminsRepository } from '@/repositories/courses-admins/find-all-courses-admins';

@QueryHandler(FindAllCoursesAdminsQuery)
export class FindAllCoursesAdminsQueryHandler
  implements IQueryHandler<FindAllCoursesAdminsQuery>
{
  constructor(
    private readonly findAllCoursesAdminRepository: FindAllCoursesAdminsRepository,
    private readonly countCoursesAdminsRepository: CountCoursesAdminsRepository
  ) {}

  async execute(
    query: FindAllCoursesAdminsQuery
  ): Promise<IPaginatedType<CoursesAdminModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const coursesAdmins = await this.findAllCoursesAdminRepository.execute(
      data
    );
    const totalCount = await this.countCoursesAdminsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CoursesAdminModel>().toPaginationList({
      items: coursesAdmins,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllCoursesAdminsQuery
  ): FindAllCoursesAdminsQuery {
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
