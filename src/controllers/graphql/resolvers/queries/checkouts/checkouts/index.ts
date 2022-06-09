import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCheckoutsInput,
  WhereDataFindAllCheckoutsInput
} from '@/controllers/graphql/inputs/checkouts/find-all-checkouts.input';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { Checkouts } from '@/controllers/graphql/types/checkouts';
import { FindAllCheckoutsService } from '@/services/checkouts/find-all-checkouts';

@Resolver(() => Checkout)
export class CheckoutsResolver {
  constructor(
    private readonly findAllCheckoutsService: FindAllCheckoutsService
  ) {}

  @Query(() => Checkouts)
  async checkouts(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCheckoutsInput,
      nullable: true
    })
    where: WhereDataFindAllCheckoutsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCheckoutsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCheckoutsInput
  ) {
    return await this.findAllCheckoutsService.execute({
      page,
      where,
      orderBy
    });
  }
}
