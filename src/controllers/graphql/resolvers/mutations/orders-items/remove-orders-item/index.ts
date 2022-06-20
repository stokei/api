import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveOrdersItemInput } from '@/controllers/graphql/inputs/orders-items/remove-orders-item.input';
import { OrdersItem } from '@/controllers/graphql/types/orders-item';
import { RemoveOrdersItemService } from '@/services/orders-items/remove-orders-item';

@Resolver(() => OrdersItem)
export class RemoveOrdersItemResolver {
  constructor(
    private readonly removeOrdersItemService: RemoveOrdersItemService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrdersItem)
  async removeOrdersItem(@Args('input') data: RemoveOrdersItemInput) {
    const response = await this.removeOrdersItemService.execute(data);
    return response;
  }
}
