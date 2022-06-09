import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCurrenciesInput,
  WhereDataFindAllCurrenciesInput
} from '@/controllers/graphql/inputs/currencies/find-all-currencies.input';
import { Currencies } from '@/controllers/graphql/types/currencies';
import { Currency } from '@/controllers/graphql/types/currency';
import { FindAllCurrenciesService } from '@/services/currencies/find-all-currencies';

@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(
    private readonly findAllCurrenciesService: FindAllCurrenciesService
  ) {}

  @Query(() => Currencies)
  async currencies(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCurrenciesInput,
      nullable: true
    })
    where: WhereDataFindAllCurrenciesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCurrenciesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCurrenciesInput
  ) {
    return await this.findAllCurrenciesService.execute({
      page,
      where,
      orderBy
    });
  }
}
