import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCardsInput,
  WhereDataFindAllCardsInput
} from '@/controllers/graphql/inputs/cards/find-all-cards.input';
import { Card } from '@/controllers/graphql/types/card';
import { Cards } from '@/controllers/graphql/types/cards';
import { FindAllCardsService } from '@/services/cards/find-all-cards';

@Resolver(() => Card)
export class CardsResolver {
  constructor(private readonly findAllCardsService: FindAllCardsService) {}

  @Query(() => Cards)
  async cards(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllCardsInput, nullable: true })
    where: WhereDataFindAllCardsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCardsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCardsInput
  ) {
    return await this.findAllCardsService.execute({
      page,
      where,
      orderBy
    });
  }
}
