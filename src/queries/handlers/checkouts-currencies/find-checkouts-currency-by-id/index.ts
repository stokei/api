import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  CheckoutsCurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';
import { FindCheckoutsCurrencyByIdQuery } from '@/queries/implements/checkouts-currencies/find-checkouts-currency-by-id.query';
import { FindCheckoutsCurrencyByIdRepository } from '@/repositories/checkouts-currencies/find-checkouts-currency-by-id';

@QueryHandler(FindCheckoutsCurrencyByIdQuery)
export class FindCheckoutsCurrencyByIdQueryHandler
  implements IQueryHandler<FindCheckoutsCurrencyByIdQuery>
{
  constructor(
    private readonly findCheckoutsCurrencyByIdRepository: FindCheckoutsCurrencyByIdRepository
  ) {}

  async execute(
    query: FindCheckoutsCurrencyByIdQuery
  ): Promise<CheckoutsCurrencyModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const checkoutsCurrency =
      await this.findCheckoutsCurrencyByIdRepository.execute(id);
    if (!checkoutsCurrency) {
      throw new CheckoutsCurrencyNotFoundException();
    }
    return checkoutsCurrency;
  }
}
