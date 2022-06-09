import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';
import { FindCheckoutsCurrencyByIdQuery } from '@/queries/implements/checkouts-currencies/find-checkouts-currency-by-id.query';

@Injectable()
export class FindCheckoutsCurrencyByIdService
  implements IBaseService<string, Promise<CheckoutsCurrencyModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CheckoutsCurrencyModel> {
    return await this.queryBus.execute(
      new FindCheckoutsCurrencyByIdQuery(data)
    );
  }
}
