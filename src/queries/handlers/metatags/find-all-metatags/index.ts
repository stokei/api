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
import { MetatagModel } from '@/models/metatag.model';
import { FindAllMetatagsQuery } from '@/queries/implements/metatags/find-all-metatags.query';
import { CountMetatagsRepository } from '@/repositories/metatags/count-metatags';
import { FindAllMetatagsRepository } from '@/repositories/metatags/find-all-metatags';

@QueryHandler(FindAllMetatagsQuery)
export class FindAllMetatagsQueryHandler
  implements IQueryHandler<FindAllMetatagsQuery>
{
  constructor(
    private readonly findAllMetatagRepository: FindAllMetatagsRepository,
    private readonly countMetatagsRepository: CountMetatagsRepository
  ) {}

  async execute(
    query: FindAllMetatagsQuery
  ): Promise<IPaginatedType<MetatagModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const metatags = await this.findAllMetatagRepository.execute(data);
    const totalCount = await this.countMetatagsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<MetatagModel>().toPaginationList({
      items: metatags,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllMetatagsQuery): FindAllMetatagsQuery {
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
