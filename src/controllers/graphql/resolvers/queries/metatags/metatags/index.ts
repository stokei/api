import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllMetatagsInput,
  WhereDataFindAllMetatagsInput
} from '@/controllers/graphql/inputs/metatags/find-all-metatags.input';
import { Metatag } from '@/controllers/graphql/types/metatag';
import { Metatags } from '@/controllers/graphql/types/metatags';
import { FindAllMetatagsService } from '@/services/metatags/find-all-metatags';

@Resolver(() => Metatag)
export class MetatagsResolver {
  constructor(
    private readonly findAllMetatagsService: FindAllMetatagsService
  ) {}

  @Query(() => Metatags)
  async metatags(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllMetatagsInput,
      nullable: true
    })
    where: WhereDataFindAllMetatagsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllMetatagsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllMetatagsInput
  ) {
    return await this.findAllMetatagsService.execute({
      page,
      where,
      orderBy
    });
  }
}
