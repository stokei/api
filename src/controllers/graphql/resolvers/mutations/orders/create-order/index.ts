import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateOrderInput } from '@/controllers/graphql/inputs/orders/create-order.input';
import { Order } from '@/controllers/graphql/types/order';
import { CreateOrderService } from '@/services/orders/create-order';

@Resolver(() => Order)
export class CreateOrderResolver {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Order)
  async createOrder(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateOrderInput
  ) {
    const response = await this.createOrderService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
