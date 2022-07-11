import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllOrderItemsInput,
  WhereDataFindAllOrderItemsInput
} from '@/controllers/graphql/inputs/order-items/find-all-order-items.input';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { OrderItems } from '@/controllers/graphql/types/order-items';
import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';

@Resolver(() => OrderItem)
export class OrderItemsResolver {
  constructor(
    private readonly findAllOrderItemsService: FindAllOrderItemsService
  ) {}

  @Query(() => OrderItems)
  async orderItems(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllOrderItemsInput,
      nullable: true
    })
    where: WhereDataFindAllOrderItemsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllOrderItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllOrderItemsInput
  ) {
    return await this.findAllOrderItemsService.execute({
      page,
      where,
      orderBy
    });
  }
}
