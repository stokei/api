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
import { ClassroomModuleModel } from '@/models/classroom-module .model';
import { FindAllClassroomModulesQuery } from '@/queries/implements/classroom-module s/find-all-classroom-module s.query';
import { CountClassroomModulesRepository } from '@/repositories/classroom-module s/count-classroom-module s';
import { FindAllClassroomModulesRepository } from '@/repositories/classroom-module s/find-all-classroom-module s';

@QueryHandler(FindAllClassroomModulesQuery)
export class FindAllClassroomModulesQueryHandler
  implements IQueryHandler<FindAllClassroomModulesQuery>
{
  constructor(
    private readonly findAllClassroomModuleRepository: FindAllClassroomModulesRepository,
    private readonly countClassroomModulesRepository: CountClassroomModulesRepository
  ) {}

  async execute(
    query: FindAllClassroomModulesQuery
  ): Promise<IPaginatedType<ClassroomModuleModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const classroomModules =
      await this.findAllClassroomModuleRepository.execute(data);
    const totalCount = await this.countClassroomModulesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ClassroomModuleModel>().toPaginationList({
      items: classroomModules,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllClassroomModulesQuery
  ): FindAllClassroomModulesQuery {
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
        updatedAt: cleanSortValue(query.orderBy?.updatedAt),
        createdBy: cleanSortValue(query.orderBy?.createdBy),
        updatedBy: cleanSortValue(query.orderBy?.updatedBy)
      })
    };
  }
}