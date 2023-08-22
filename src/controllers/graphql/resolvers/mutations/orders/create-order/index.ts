import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateOrderInput } from '@/controllers/graphql/inputs/orders/create-order.input';
import { Order } from '@/controllers/graphql/types/order';
import { CreateOrderService } from '@/services/orders/create-order';

@Resolver(() => Order)
export class CreateOrderResolver {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Order)
  async createOrder(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppId: string,
    @Args('input') data: CreateOrderInput
  ) {
    const response = await this.createOrderService.execute({
      ...data,
      parent: currentAccountId,
      app: currentAppId,
      createdBy: currentAccountId
    });
    return response;
  }
}
