import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { CurrencyModel } from '@/models/currency.model';
import { FindAllCurrenciesDTO } from '@/dtos/currencies/find-all-currencies.dto';
import { FindAllCurrenciesQuery } from '@/queries/implements/currencies/find-all-currencies.query';

@Injectable()
export class FindAllCurrenciesService
  implements
    IBaseService<FindAllCurrenciesDTO, Promise<IPaginatedType<CurrencyModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCurrenciesDTO
  ): Promise<IPaginatedType<CurrencyModel>> {
    return await this.queryBus.execute(new FindAllCurrenciesQuery(data));
  }
}
