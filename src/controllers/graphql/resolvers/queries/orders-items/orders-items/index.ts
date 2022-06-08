import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllOrdersItemsInput,
  WhereDataFindAllOrdersItemsInput
} from '@/controllers/graphql/inputs/orders-items/find-all-orders-items.input';
import { OrdersItem } from '@/controllers/graphql/types/orders-item';
import { OrdersItems } from '@/controllers/graphql/types/orders-items';
import { FindAllOrdersItemsService } from '@/services/orders-items/find-all-orders-items';

@Resolver(() => OrdersItem)
export class OrdersItemsResolver {
  constructor(
    private readonly findAllOrdersItemsService: FindAllOrdersItemsService
  ) {}

  @Query(() => OrdersItems)
  async ordersItems(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllOrdersItemsInput,
      nullable: true
    })
    where: WhereDataFindAllOrdersItemsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllOrdersItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllOrdersItemsInput
  ) {
    return await this.findAllOrdersItemsService.execute({
      page,
      where,
      orderBy
    });
  }
}
