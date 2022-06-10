import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateOrdersAddressInput } from '@/controllers/graphql/inputs/orders-addresses/create-orders-address.input';
import { OrdersAddress } from '@/controllers/graphql/types/orders-address';
import { CreateOrdersAddressService } from '@/services/orders-addresses/create-orders-address';

@Resolver(() => OrdersAddress)
export class CreateOrdersAddressResolver {
  constructor(
    private readonly createOrdersAddressService: CreateOrdersAddressService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrdersAddress)
  async createOrdersAddress(@Args('input') data: CreateOrdersAddressInput) {
    const response = await this.createOrdersAddressService.execute(data);
    return response;
  }
}
