import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCatalogsInput,
  WhereDataFindAllCatalogsInput
} from '@/controllers/graphql/inputs/catalogs/find-all-catalogs.input';
import { Catalog } from '@/controllers/graphql/types/catalog';
import { Catalogs } from '@/controllers/graphql/types/catalogs';
import { FindAllCatalogsService } from '@/services/catalogs/find-all-catalogs';

@Resolver(() => Catalog)
export class CatalogsResolver {
  constructor(
    private readonly findAllCatalogsService: FindAllCatalogsService
  ) {}

  @Query(() => Catalogs)
  async catalogs(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCatalogsInput,
      nullable: true
    })
    where: WhereDataFindAllCatalogsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCatalogsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCatalogsInput
  ) {
    return await this.findAllCatalogsService.execute({
      page,
      where,
      orderBy
    });
  }
}
