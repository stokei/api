import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  CurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CurrencyModel } from '@/models/currency.model';
import { FindCurrencyByIdRepository } from '@/repositories/currencies/find-currency-by-id';
import { FindCurrencyByIdQuery } from '@/queries/implements/currencies/find-currency-by-id.query';

@QueryHandler(FindCurrencyByIdQuery)
export class FindCurrencyByIdQueryHandler
  implements IQueryHandler<FindCurrencyByIdQuery>
{
  constructor(
    private readonly findCurrencyByIdRepository: FindCurrencyByIdRepository
  ) {}

  async execute(query: FindCurrencyByIdQuery): Promise<CurrencyModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const currency = await this.findCurrencyByIdRepository.execute(id);
    if (!currency) {
      throw new CurrencyNotFoundException();
    }
    return currency;
  }
}
