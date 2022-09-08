import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  PricesNotFoundException
} from '@/errors';
import { PriceModel } from '@/models/price.model';
import { FindPricesByStripePriceIdsQuery } from '@/queries/implements/prices/find-prices-by-stripe-price-ids.query';
import { FindPricesByStripePriceIdsRepository } from '@/repositories/prices/find-prices-by-stripe-price-ids';

@QueryHandler(FindPricesByStripePriceIdsQuery)
export class FindPricesByStripePriceIdsQueryHandler
  implements IQueryHandler<FindPricesByStripePriceIdsQuery>
{
  constructor(
    private readonly findPricesByStripePriceIdsRepository: FindPricesByStripePriceIdsRepository
  ) {}

  async execute(query: FindPricesByStripePriceIdsQuery): Promise<PriceModel[]> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const ids =
      query.ids?.length > 0
        ? query.ids.map((id) => cleanValue(id))?.filter(Boolean)
        : undefined;
    if (!ids?.length) {
      throw new ParamNotFoundException('ids');
    }

    const prices = await this.findPricesByStripePriceIdsRepository.execute(ids);
    if (!prices) {
      throw new PricesNotFoundException();
    }
    return prices;
  }
}
