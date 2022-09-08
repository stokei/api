import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PriceModel } from '@/models/price.model';
import { FindPricesByStripePriceIdsQuery } from '@/queries/implements/prices/find-prices-by-stripe-price-ids.query';

@Injectable()
export class FindPricesByStripePriceIdsService
  implements IBaseService<string[], Promise<PriceModel[]>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string[]): Promise<PriceModel[]> {
    return await this.queryBus.execute(
      new FindPricesByStripePriceIdsQuery(data)
    );
  }
}
