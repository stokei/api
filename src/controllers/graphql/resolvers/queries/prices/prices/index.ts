import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllPricesInput,
  WhereDataFindAllPricesInput
} from '@/controllers/graphql/inputs/prices/find-all-prices.input';
import { Price } from '@/controllers/graphql/types/price';
import { Prices } from '@/controllers/graphql/types/prices';
import { FindAllPricesService } from '@/services/prices/find-all-prices';

@Resolver(() => Price)
export class PricesResolver {
  constructor(private readonly findAllPricesService: FindAllPricesService) {}

  @Query(() => Prices)
  async prices(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllPricesInput, nullable: true })
    where: WhereDataFindAllPricesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPricesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPricesInput
  ) {
    return await this.findAllPricesService.execute({
      page,
      where,
      orderBy
    });
  }
}
