import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateOrderInput } from '@/controllers/graphql/inputs/orders/update-order.input';
import { Order } from '@/controllers/graphql/types/order';
import { UpdateOrderService } from '@/services/orders/update-order';

@Resolver(() => Order)
export class UpdateOrderResolver {
  constructor(private readonly updateOrderService: UpdateOrderService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Order)
  async updateOrder(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateOrderInput
  ) {
    const response = await this.updateOrderService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
