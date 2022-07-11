import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateOrderItemInput } from '@/controllers/graphql/inputs/order-items/update-order-item.input';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { UpdateOrderItemService } from '@/services/order-items/update-order-item';

@Resolver(() => OrderItem)
export class UpdateOrderItemResolver {
  constructor(
    private readonly updateOrderItemService: UpdateOrderItemService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrderItem)
  async updateOrderItem(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateOrderItemInput
  ) {
    const response = await this.updateOrderItemService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
