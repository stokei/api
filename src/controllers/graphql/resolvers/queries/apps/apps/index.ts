import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllAppsInput,
  WhereDataFindAllAppsInput
} from '@/controllers/graphql/inputs/apps/find-all-apps.input';
import { App } from '@/controllers/graphql/types/app';
import { Apps } from '@/controllers/graphql/types/apps';
import { FindAllAppsService } from '@/services/apps/find-all-apps';

@Resolver(() => App)
export class AppsResolver {
  constructor(private readonly findAllAppsService: FindAllAppsService) {}

  @Query(() => Apps)
  async apps(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllAppsInput,
      nullable: true
    })
    where: WhereDataFindAllAppsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllAppsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllAppsInput
  ) {
    return await this.findAllAppsService.execute({
      page,
      where,
      orderBy
    });
  }
}
