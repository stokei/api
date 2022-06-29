import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateOrdersItemInput } from '@/controllers/graphql/inputs/orders-items/create-orders-item.input';
import { OrdersItem } from '@/controllers/graphql/types/orders-item';
import { CreateOrdersItemService } from '@/services/orders-items/create-orders-item';

@Resolver(() => OrdersItem)
export class CreateOrdersItemResolver {
  constructor(
    private readonly createOrdersItemService: CreateOrdersItemService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrdersItem)
  async createOrdersItem(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateOrdersItemInput
  ) {
    const response = await this.createOrdersItemService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
