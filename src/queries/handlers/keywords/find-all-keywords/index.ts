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
import { KeywordModel } from '@/models/keyword.model';
import { FindAllKeywordsQuery } from '@/queries/implements/keywords/find-all-keywords.query';
import { CountKeywordsRepository } from '@/repositories/keywords/count-keywords';
import { FindAllKeywordsRepository } from '@/repositories/keywords/find-all-keywords';

@QueryHandler(FindAllKeywordsQuery)
export class FindAllKeywordsQueryHandler
  implements IQueryHandler<FindAllKeywordsQuery>
{
  constructor(
    private readonly findAllKeywordRepository: FindAllKeywordsRepository,
    private readonly countKeywordsRepository: CountKeywordsRepository
  ) {}

  async execute(
    query: FindAllKeywordsQuery
  ): Promise<IPaginatedType<KeywordModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const keywords = await this.findAllKeywordRepository.execute(data);
    const totalCount = await this.countKeywordsRepository.execute({
      where: data.where
    });
    return new PaginationMapper<KeywordModel>().toPaginationList({
      items: keywords,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllKeywordsQuery): FindAllKeywordsQuery {
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
