import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveOrderItemInput } from '@/controllers/graphql/inputs/order-items/remove-order-item.input';
import { OrderItem } from '@/controllers/graphql/types/order-item';
import { RemoveOrderItemService } from '@/services/order-items/remove-order-item';

@Resolver(() => OrderItem)
export class RemoveOrderItemResolver {
  constructor(
    private readonly removeOrderItemService: RemoveOrderItemService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrderItem)
  async removeOrderItem(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveOrderItemInput
  ) {
    const response = await this.removeOrderItemService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
