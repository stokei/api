import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllAppAdminsInput,
  WhereDataFindAllAppAdminsInput
} from '@/controllers/graphql/inputs/app-admins/find-all-app-admins.input';
import { AppAdmin } from '@/controllers/graphql/types/app-admin';
import { AppAdmins } from '@/controllers/graphql/types/app-admins';
import { FindAllAppAdminsService } from '@/services/app-admins/find-all-app-admins';

@Resolver(() => AppAdmin)
export class AppAdminsResolver {
  constructor(
    private readonly findAllAppAdminsService: FindAllAppAdminsService
  ) {}

  @Query(() => AppAdmins)
  async appAdmins(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllAppAdminsInput,
      nullable: true
    })
    where: WhereDataFindAllAppAdminsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllAppAdminsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllAppAdminsInput
  ) {
    return await this.findAllAppAdminsService.execute({
      page,
      where,
      orderBy
    });
  }
}
