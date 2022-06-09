import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateOrderInput } from '@/controllers/graphql/inputs/orders/create-order.input';
import { Order } from '@/controllers/graphql/types/order';
import { CreateOrderService } from '@/services/orders/create-order';

@Resolver(() => Order)
export class CreateOrderResolver {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Order)
  async createOrder(
    @Args('input') data: CreateOrderInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createOrderService.execute(data);
    return response;
  }
}
