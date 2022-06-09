import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateOrdersAddressInput } from '@/controllers/graphql/inputs/orders-addresses/create-orders-address.input';
import { OrdersAddress } from '@/controllers/graphql/types/orders-address';
import { CreateOrdersAddressService } from '@/services/orders-addresses/create-orders-address';

@Resolver(() => OrdersAddress)
export class CreateOrdersAddressResolver {
  constructor(
    private readonly createOrdersAddressService: CreateOrdersAddressService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => OrdersAddress)
  async createOrdersAddress(
    @Args('input') data: CreateOrdersAddressInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createOrdersAddressService.execute(data);
    return response;
  }
}
