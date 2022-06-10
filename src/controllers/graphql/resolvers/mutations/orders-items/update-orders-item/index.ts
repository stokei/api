import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateOrdersItemInput } from '@/controllers/graphql/inputs/orders-items/update-orders-item.input';
import { OrdersItem } from '@/controllers/graphql/types/orders-item';
import { UpdateOrdersItemService } from '@/services/orders-items/update-orders-item';

@Resolver(() => OrdersItem)
export class UpdateOrdersItemResolver {
  constructor(
    private readonly updateOrdersItemService: UpdateOrdersItemService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrdersItem)
  async updateOrdersItem(@Args('input') data: UpdateOrdersItemInput) {
    const response = await this.updateOrdersItemService.execute(data);
    return response;
  }
}
