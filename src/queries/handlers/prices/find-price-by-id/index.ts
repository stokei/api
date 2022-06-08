import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  PriceNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { PriceModel } from '@/models/price.model';
import { FindPriceByIdRepository } from '@/repositories/prices/find-price-by-id';
import { FindPriceByIdQuery } from '@/queries/implements/prices/find-price-by-id.query';

@QueryHandler(FindPriceByIdQuery)
export class FindPriceByIdQueryHandler
  implements IQueryHandler<FindPriceByIdQuery>
{
  constructor(
    private readonly findPriceByIdRepository: FindPriceByIdRepository
  ) {}

  async execute(query: FindPriceByIdQuery): Promise<PriceModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const price = await this.findPriceByIdRepository.execute(id);
    if (!price) {
      throw new PriceNotFoundException();
    }
    return price;
  }
}
