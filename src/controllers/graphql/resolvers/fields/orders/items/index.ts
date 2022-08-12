import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllOrderItemsInput } from '@/controllers/graphql/inputs/order-items/find-all-order-items.input';
import { Order } from '@/controllers/graphql/types/order';
import { OrderItems } from '@/controllers/graphql/types/order-items';
import { OrderModel } from '@/models/order.model';
import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';

@Resolver(() => Order)
export class OrderOrderItemsResolver {
  constructor(
    private readonly findAllOrderItemsService: FindAllOrderItemsService
  ) {}

  @ResolveField(() => OrderItems, { nullable: true })
  phones(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllOrderItemsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllOrderItemsInput,
    @Parent() order: OrderModel
  ) {
    return this.findAllOrderItemsService.execute({
      page,
      orderBy,
      where: {
        AND: {
          order: {
            equals: order.id
          }
        }
      }
    });
  }
}
