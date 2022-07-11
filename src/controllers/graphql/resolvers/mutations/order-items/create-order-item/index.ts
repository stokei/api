import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateOrderItemInput } from '@/controllers/graphql/inputs/order-items/create-order-item.input';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { CreateOrderItemService } from '@/services/order-items/create-order-item';

@Resolver(() => OrderItem)
export class CreateOrderItemResolver {
  constructor(
    private readonly createOrderItemService: CreateOrderItemService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrderItem)
  async createOrderItem(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateOrderItemInput
  ) {
    const response = await this.createOrderItemService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
