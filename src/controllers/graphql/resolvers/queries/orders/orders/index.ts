import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllOrdersInput,
  WhereDataFindAllOrdersInput
} from '@/controllers/graphql/inputs/orders/find-all-orders.input';
import { Order } from '@/controllers/graphql/types/order';
import { Orders } from '@/controllers/graphql/types/orders';
import { FindAllOrdersService } from '@/services/orders/find-all-orders';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly findAllOrdersService: FindAllOrdersService) {}

  @Query(() => Orders)
  async orders(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllOrdersInput, nullable: true })
    where: WhereDataFindAllOrdersInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllOrdersInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllOrdersInput
  ) {
    return await this.findAllOrdersService.execute({
      page,
      where,
      orderBy
    });
  }
}
