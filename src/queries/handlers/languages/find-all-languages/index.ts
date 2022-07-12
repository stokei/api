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
import { LanguageModel } from '@/models/language.model';
import { FindAllLanguagesQuery } from '@/queries/implements/languages/find-all-languages.query';
import { CountLanguagesRepository } from '@/repositories/languages/count-languages';
import { FindAllLanguagesRepository } from '@/repositories/languages/find-all-languages';

@QueryHandler(FindAllLanguagesQuery)
export class FindAllLanguagesQueryHandler
  implements IQueryHandler<FindAllLanguagesQuery>
{
  constructor(
    private readonly findAllLanguageRepository: FindAllLanguagesRepository,
    private readonly countLanguagesRepository: CountLanguagesRepository
  ) {}

  async execute(
    query: FindAllLanguagesQuery
  ): Promise<IPaginatedType<LanguageModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const languages = await this.findAllLanguageRepository.execute(data);
    const totalCount = await this.countLanguagesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<LanguageModel>().toPaginationList({
      items: languages,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllLanguagesQuery): FindAllLanguagesQuery {
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
          updatedBy: cleanWhereDataString(operatorData.updatedBy),
          createdBy: cleanWhereDataString(operatorData.createdBy),
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
