import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { CurrencyModel } from '@/models/currency.model';
import { FindCurrencyByIdQuery } from '@/queries/implements/currencies/find-currency-by-id.query';

@Injectable()
export class FindCurrencyByIdService
  implements IBaseService<string, Promise<CurrencyModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CurrencyModel> {
    return await this.queryBus.execute(new FindCurrencyByIdQuery(data));
  }
}
