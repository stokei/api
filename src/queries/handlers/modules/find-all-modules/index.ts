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
import { ModuleModel } from '@/models/module.model';
import { FindAllModulesQuery } from '@/queries/implements/modules/find-all-modules.query';
import { CountModulesRepository } from '@/repositories/modules/count-modules';
import { FindAllModulesRepository } from '@/repositories/modules/find-all-modules';

@QueryHandler(FindAllModulesQuery)
export class FindAllModulesQueryHandler
  implements IQueryHandler<FindAllModulesQuery>
{
  constructor(
    private readonly findAllModuleRepository: FindAllModulesRepository,
    private readonly countModulesRepository: CountModulesRepository
  ) {}

  async execute(
    query: FindAllModulesQuery
  ): Promise<IPaginatedType<ModuleModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const modules = await this.findAllModuleRepository.execute(data);
    const totalCount = await this.countModulesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ModuleModel>().toPaginationList({
      items: modules,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllModulesQuery): FindAllModulesQuery {
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
