import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { CurrencyMapper } from '@/mappers/currencies';
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

    const data = new CurrencyMapper().toFindAllQueryClean(query);
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
}
