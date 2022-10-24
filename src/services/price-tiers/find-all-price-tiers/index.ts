import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllPriceTiersDTO } from '@/dtos/price-tiers/find-all-price-tiers.dto';
import { PriceTierModel } from '@/models/price-tier.model';
import { FindAllPriceTiersQuery } from '@/queries/implements/price-tiers/find-all-price-tiers.query';

@Injectable()
export class FindAllPriceTiersService
  implements
    IBaseService<FindAllPriceTiersDTO, Promise<IPaginatedType<PriceTierModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllPriceTiersDTO
  ): Promise<IPaginatedType<PriceTierModel>> {
    return await this.queryBus.execute(new FindAllPriceTiersQuery(data));
  }
}
