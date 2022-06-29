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
import { CurrencyModel } from '@/models/currency.model';
import { FindAllCurrenciesQuery } from '@/queries/implements/currencies/find-all-currencies.query';
import { CountCurrenciesRepository } from '@/repositories/currencies/count-currencies';
import { FindAllCurrenciesRepository } from '@/repositories/currencies/find-all-currencies';

@QueryHandler(FindAllCurrenciesQuery)
export class FindAllCurrenciesQueryHandler
  implements IQueryHandler<FindAllCurrenciesQuery>
{
  constructor(
    private readonly findAllCurrencyRepository: FindAllCurrenciesRepository,
    private readonly countCurrenciesRepository: CountCurrenciesRepository
  ) {}

  async execute(
    query: FindAllCurrenciesQuery
  ): Promise<IPaginatedType<CurrencyModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.clearData(query);
    const currencies = await this.findAllCurrencyRepository.execute(data);
    const totalCount = await this.countCurrenciesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<CurrencyModel>().toPaginationList({
      items: currencies,
      page: data.page,
      totalCount
    });
  }

  private clearData(query: FindAllCurrenciesQuery): FindAllCurrenciesQuery {
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
