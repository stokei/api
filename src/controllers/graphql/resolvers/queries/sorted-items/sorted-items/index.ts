import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllSortedItemsInput,
  WhereDataFindAllSortedItemsInput
} from '@/controllers/graphql/inputs/sorted-items/find-all-sorted-items.input';
import { SortedItem } from '@/controllers/graphql/types/sorted-item';
import { SortedItems } from '@/controllers/graphql/types/sorted-items';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';
import { FindAllSortedItemsService } from '@/services/sorted-items/find-all-sorted-items';

@Resolver(() => SortedItem)
export class SortedItemsResolver {
  constructor(
    private readonly findAllSortedItemsService: FindAllSortedItemsService,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @Query(() => SortedItems)
  async sortedItems(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllSortedItemsInput,
      nullable: true
    })
    where: WhereDataFindAllSortedItemsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllSortedItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSortedItemsInput
  ) {
    return await this.getOrSetCacheService.execute(
      SortedItemsResolver.name + JSON.stringify({ where, page, orderBy }),
      () =>
        this.findAllSortedItemsService.execute({
          page,
          where,
          orderBy
        })
    );
  }
}
