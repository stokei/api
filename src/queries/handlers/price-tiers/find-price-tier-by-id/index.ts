import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceTierNotFoundException
} from '@/errors';
import { PriceTierModel } from '@/models/price-tier.model';
import { FindPriceTierByIdQuery } from '@/queries/implements/price-tiers/find-price-tier-by-id.query';
import { FindPriceTierByIdRepository } from '@/repositories/price-tiers/find-price-tier-by-id';

@QueryHandler(FindPriceTierByIdQuery)
export class FindPriceTierByIdQueryHandler
  implements IQueryHandler<FindPriceTierByIdQuery>
{
  constructor(
    private readonly findPriceTierByIdRepository: FindPriceTierByIdRepository
  ) {}

  async execute(query: FindPriceTierByIdQuery): Promise<PriceTierModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const priceTier = await this.findPriceTierByIdRepository.execute(id);
    if (!priceTier) {
      throw new PriceTierNotFoundException();
    }
    return priceTier;
  }
}
