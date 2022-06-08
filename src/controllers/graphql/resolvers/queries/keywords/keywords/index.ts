import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllKeywordsInput,
  WhereDataFindAllKeywordsInput
} from '@/controllers/graphql/inputs/keywords/find-all-keywords.input';
import { Keyword } from '@/controllers/graphql/types/keyword';
import { Keywords } from '@/controllers/graphql/types/keywords';
import { FindAllKeywordsService } from '@/services/keywords/find-all-keywords';

@Resolver(() => Keyword)
export class KeywordsResolver {
  constructor(
    private readonly findAllKeywordsService: FindAllKeywordsService
  ) {}

  @Query(() => Keywords)
  async keywords(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllKeywordsInput,
      nullable: true
    })
    where: WhereDataFindAllKeywordsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllKeywordsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllKeywordsInput
  ) {
    return await this.findAllKeywordsService.execute({
      page,
      where,
      orderBy
    });
  }
}
