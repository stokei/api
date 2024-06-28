import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllPluginsInput,
  WhereDataFindAllPluginsInput
} from '@/controllers/graphql/inputs/plugins/find-all-plugins.input';
import { Plugin } from '@/controllers/graphql/types/plugin';
import { Plugins } from '@/controllers/graphql/types/plugins';
import { FindAllPluginsService } from '@/services/plugins/find-all-plugins';

@Resolver(() => Plugin)
export class PluginsResolver {
  constructor(private readonly findAllPluginsService: FindAllPluginsService) {}

  @Query(() => Plugins)
  async plugins(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllPluginsInput,
      nullable: true
    })
    where: WhereDataFindAllPluginsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPluginsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPluginsInput
  ) {
    return await this.findAllPluginsService.execute({
      page,
      where,
      orderBy
    });
  }
}
