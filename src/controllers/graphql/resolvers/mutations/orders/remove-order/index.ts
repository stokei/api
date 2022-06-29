import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveOrderInput } from '@/controllers/graphql/inputs/orders/remove-order.input';
import { Order } from '@/controllers/graphql/types/order';
import { RemoveOrderService } from '@/services/orders/remove-order';

@Resolver(() => Order)
export class RemoveOrderResolver {
  constructor(private readonly removeOrderService: RemoveOrderService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Order)
  async removeOrder(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveOrderInput
  ) {
    const response = await this.removeOrderService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
