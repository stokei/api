import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllHerosInput,
  WhereDataFindAllHerosInput
} from '@/controllers/graphql/inputs/heros/find-all-heros.input';
import { Hero } from '@/controllers/graphql/types/hero';
import { Heros } from '@/controllers/graphql/types/heros';
import { FindAllHerosService } from '@/services/heros/find-all-heros';

@Resolver(() => Hero)
export class HerosResolver {
  constructor(private readonly findAllHerosService: FindAllHerosService) {}

  @Query(() => Heros)
  async heros(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllHerosInput,
      nullable: true
    })
    where: WhereDataFindAllHerosInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllHerosInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllHerosInput
  ) {
    return await this.findAllHerosService.execute({
      page,
      where,
      orderBy
    });
  }
}
