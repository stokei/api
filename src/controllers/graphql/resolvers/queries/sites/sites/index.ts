import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllSitesInput,
  WhereDataFindAllSitesInput
} from '@/controllers/graphql/inputs/sites/find-all-sites.input';
import { Site } from '@/controllers/graphql/types/site';
import { Sites } from '@/controllers/graphql/types/sites';
import { FindAllSitesService } from '@/services/sites/find-all-sites';

@Resolver(() => Site)
export class SitesResolver {
  constructor(private readonly findAllSitesService: FindAllSitesService) {}

  @Query(() => Sites)
  async sites(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllSitesInput, nullable: true })
    where: WhereDataFindAllSitesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllSitesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSitesInput
  ) {
    return await this.findAllSitesService.execute({
      page,
      where,
      orderBy
    });
  }
}
