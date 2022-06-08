import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';
import { FindAllCheckoutsCurrenciesDTO } from '@/dtos/checkouts-currencies/find-all-checkouts-currencies.dto';
import { FindAllCheckoutsCurrenciesQuery } from '@/queries/implements/checkouts-currencies/find-all-checkouts-currencies.query';

@Injectable()
export class FindAllCheckoutsCurrenciesService
  implements
    IBaseService<
      FindAllCheckoutsCurrenciesDTO,
      Promise<IPaginatedType<CheckoutsCurrencyModel>>
    >
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(
    data: FindAllCheckoutsCurrenciesDTO
  ): Promise<IPaginatedType<CheckoutsCurrencyModel>> {
    return await this.queryBus.execute(
      new FindAllCheckoutsCurrenciesQuery(data)
    );
  }
}
