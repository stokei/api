import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllCatalogItemsInput,
  WhereDataFindAllCatalogItemsInput
} from '@/controllers/graphql/inputs/catalog-items/find-all-catalog-items.input';
import { CatalogItem } from '@/controllers/graphql/types/catalog-item';
import { CatalogItems } from '@/controllers/graphql/types/catalog-items';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';
import { FindAllCatalogItemsService } from '@/services/catalog-items/find-all-catalog-items';

@Resolver(() => CatalogItem)
export class CatalogItemsResolver {
  constructor(
    private readonly findAllCatalogItemsService: FindAllCatalogItemsService,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @Query(() => CatalogItems)
  async catalogItems(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCatalogItemsInput,
      nullable: true
    })
    where: WhereDataFindAllCatalogItemsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCatalogItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCatalogItemsInput
  ) {
    return await this.getOrSetCacheService.execute(
      CatalogItemsResolver.name + JSON.stringify({ where, page, orderBy }),
      () =>
        this.findAllCatalogItemsService.execute({
          page,
          where,
          orderBy
        })
    );
  }
}
