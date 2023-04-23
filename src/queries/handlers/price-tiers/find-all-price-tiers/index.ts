import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IPaginatedType, PaginationMapper } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { PriceTierMapper } from '@/mappers/price-tiers';
import { PriceTierModel } from '@/models/price-tier.model';
import { FindAllPriceTiersQuery } from '@/queries/implements/price-tiers/find-all-price-tiers.query';
import { CountPriceTiersRepository } from '@/repositories/price-tiers/count-price-tiers';
import { FindAllPriceTiersRepository } from '@/repositories/price-tiers/find-all-price-tiers';

@QueryHandler(FindAllPriceTiersQuery)
export class FindAllPriceTiersQueryHandler
  implements IQueryHandler<FindAllPriceTiersQuery>
{
  constructor(
    private readonly findAllPriceTierRepository: FindAllPriceTiersRepository,
    private readonly countPriceTiersRepository: CountPriceTiersRepository
  ) {}

  async execute(
    query: FindAllPriceTiersQuery
  ): Promise<IPaginatedType<PriceTierModel>> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = new PriceTierMapper().toFindAllQueryClean(query);
    const priceTiers = await this.findAllPriceTierRepository.execute(data);
    const totalCount = await this.countPriceTiersRepository.execute({
      where: data.where
    });
    return new PaginationMapper<PriceTierModel>().toPaginationList({
      items: priceTiers,
      page: data.page,
      totalCount
    });
  }
}
