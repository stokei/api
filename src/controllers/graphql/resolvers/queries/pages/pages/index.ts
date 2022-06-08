import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllPagesInput,
  WhereDataFindAllPagesInput
} from '@/controllers/graphql/inputs/pages/find-all-pages.input';
import { Page } from '@/controllers/graphql/types/page';
import { Pages } from '@/controllers/graphql/types/pages';
import { FindAllPagesService } from '@/services/pages/find-all-pages';

@Resolver(() => Page)
export class PagesResolver {
  constructor(private readonly findAllPagesService: FindAllPagesService) {}

  @Query(() => Pages)
  async pages(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllPagesInput, nullable: true })
    where: WhereDataFindAllPagesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPagesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPagesInput
  ) {
    return await this.findAllPagesService.execute({
      page,
      where,
      orderBy
    });
  }
}
