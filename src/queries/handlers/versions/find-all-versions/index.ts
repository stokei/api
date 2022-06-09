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
import { VersionModel } from '@/models/version.model';
import { FindAllVersionsQuery } from '@/queries/implements/versions/find-all-versions.query';
import { CountVersionsRepository } from '@/repositories/versions/count-versions';
import { FindAllVersionsRepository } from '@/repositories/versions/find-all-versions';

@QueryHandler(FindAllVersionsQuery)
export class FindAllVersionsQueryHandler
  implements IQueryHandler<FindAllVersionsQuery>
{
  constructor(
    private readonly findAllVersionRepository: FindAllVersionsRepository,
    private readonly countVersionsRepository: CountVersionsRepository
  ) {}

  async execute(
    query: FindAllVersionsQuery
  ): Promise<IPaginatedType<VersionModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const versions = await this.findAllVersionRepository.execute(data);
    const totalCount = await this.countVersionsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<VersionModel>().toPaginationList({
      items: versions,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllVersionsQuery): FindAllVersionsQuery {
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
