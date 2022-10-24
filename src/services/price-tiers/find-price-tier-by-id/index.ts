import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { PriceTierModel } from '@/models/price-tier.model';
import { FindPriceTierByIdQuery } from '@/queries/implements/price-tiers/find-price-tier-by-id.query';

@Injectable()
export class FindPriceTierByIdService
  implements IBaseService<string, Promise<PriceTierModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<PriceTierModel> {
    return await this.queryBus.execute(new FindPriceTierByIdQuery(data));
  }
}
