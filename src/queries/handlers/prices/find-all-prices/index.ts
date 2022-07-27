import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { PriceMapper } from '@/mappers/prices';
import { PriceModel } from '@/models/price.model';
import { FindAllPricesQuery } from '@/queries/implements/prices/find-all-prices.query';
import { CountPricesRepository } from '@/repositories/prices/count-prices';
import { FindAllPricesRepository } from '@/repositories/prices/find-all-prices';

@QueryHandler(FindAllPricesQuery)
export class FindAllPricesQueryHandler
  implements IQueryHandler<FindAllPricesQuery>
{
  constructor(
    private readonly findAllPriceRepository: FindAllPricesRepository,
    private readonly countPricesRepository: CountPricesRepository
  ) {}

  async execute(
    query: FindAllPricesQuery
  ): Promise<IPaginatedType<PriceModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new PriceMapper().toFindAllQueryClean(query);
    const prices = await this.findAllPriceRepository.execute(data);
    const totalCount = await this.countPricesRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PriceModel>().toPaginationList({
      items: prices,
      page: data.page,
      totalCount
    });
  }
}
