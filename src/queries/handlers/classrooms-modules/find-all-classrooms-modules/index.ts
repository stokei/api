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
import { ClassroomsModuleModel } from '@/models/classrooms-module.model';
import { FindAllClassroomsModulesQuery } from '@/queries/implements/classrooms-modules/find-all-classrooms-modules.query';
import { CountClassroomsModulesRepository } from '@/repositories/classrooms-modules/count-classrooms-modules';
import { FindAllClassroomsModulesRepository } from '@/repositories/classrooms-modules/find-all-classrooms-modules';

@QueryHandler(FindAllClassroomsModulesQuery)
export class FindAllClassroomsModulesQueryHandler
  implements IQueryHandler<FindAllClassroomsModulesQuery>
{
  constructor(
    private readonly findAllClassroomsModuleRepository: FindAllClassroomsModulesRepository,
    private readonly countClassroomsModulesRepository: CountClassroomsModulesRepository
  ) {}

  async execute(
    query: FindAllClassroomsModulesQuery
  ): Promise<IPaginatedType<ClassroomsModuleModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomsModules =
      await this.findAllClassroomsModuleRepository.execute(data);
    const totalCount = await this.countClassroomsModulesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomsModuleModel>().toPaginationList({
      items: classroomsModules,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomsModulesQuery
  ): FindAllClassroomsModulesQuery {
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
