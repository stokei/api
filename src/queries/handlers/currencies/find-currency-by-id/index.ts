import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue } from '@stokei/nestjs';

import {
  CurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CurrencyModel } from '@/models/currency.model';
import { FindCurrencyByIdQuery } from '@/queries/implements/currencies/find-currency-by-id.query';
import { FindCurrencyByIdRepository } from '@/repositories/currencies/find-currency-by-id';

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

    const id = cleanValue(query.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const currency = await this.findCurrencyByIdRepository.execute(
      id.toUpperCase()
    );
    if (!currency) {
      throw new CurrencyNotFoundException();
    }
    return currency;
  }
}
