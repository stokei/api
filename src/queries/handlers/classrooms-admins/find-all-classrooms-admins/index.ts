import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  IOperator,
  IPaginatedType,
  PaginationMapper,
  cleanObject,
  cleanSortValue,
  cleanValueNumber,
  cleanWhereDataString,
  cleanWhereDataSearch,
  cleanValue,
  splitServiceId
} from '@stokei/nestjs';
import { DataNotFoundException } from '@/errors';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';
import { FindAllClassroomsAdminsQuery } from '@/queries/implements/classrooms-admins/find-all-classrooms-admins.query';
import { CountClassroomsAdminsRepository } from '@/repositories/classrooms-admins/count-classrooms-admins';
import { FindAllClassroomsAdminsRepository } from '@/repositories/classrooms-admins/find-all-classrooms-admins';

@QueryHandler(FindAllClassroomsAdminsQuery)
export class FindAllClassroomsAdminsQueryHandler
  implements IQueryHandler<FindAllClassroomsAdminsQuery>
{
  constructor(
    private readonly findAllClassroomsAdminRepository: FindAllClassroomsAdminsRepository,
    private readonly countClassroomsAdminsRepository: CountClassroomsAdminsRepository
  ) {}

  async execute(
    query: FindAllClassroomsAdminsQuery
  ): Promise<IPaginatedType<ClassroomsAdminModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomsAdmins =
      await this.findAllClassroomsAdminRepository.execute(data);
    const totalCount = await this.countClassroomsAdminsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomsAdminModel>().toPaginationList({
      items: classroomsAdmins,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomsAdminsQuery
  ): FindAllClassroomsAdminsQuery {
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
