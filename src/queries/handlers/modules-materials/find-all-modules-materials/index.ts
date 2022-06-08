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
import { ModulesMaterialModel } from '@/models/modules-material.model';
import { FindAllModulesMaterialsQuery } from '@/queries/implements/modules-materials/find-all-modules-materials.query';
import { CountModulesMaterialsRepository } from '@/repositories/modules-materials/count-modules-materials';
import { FindAllModulesMaterialsRepository } from '@/repositories/modules-materials/find-all-modules-materials';

@QueryHandler(FindAllModulesMaterialsQuery)
export class FindAllModulesMaterialsQueryHandler
  implements IQueryHandler<FindAllModulesMaterialsQuery>
{
  constructor(
    private readonly findAllModulesMaterialRepository: FindAllModulesMaterialsRepository,
    private readonly countModulesMaterialsRepository: CountModulesMaterialsRepository
  ) {}

  async execute(
    query: FindAllModulesMaterialsQuery
  ): Promise<IPaginatedType<ModulesMaterialModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const modulesMaterials =
      await this.findAllModulesMaterialRepository.execute(data);
    const totalCount = await this.countModulesMaterialsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<ModulesMaterialModel>().toPaginationList({
      items: modulesMaterials,
      page: data.page,
      totalCount
    });
  }

  private clearData(
    query: FindAllModulesMaterialsQuery
  ): FindAllModulesMaterialsQuery {
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
