import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateOrdersAddressInput } from '@/controllers/graphql/inputs/orders-addresses/update-orders-address.input';
import { OrdersAddress } from '@/controllers/graphql/types/orders-address';
import { UpdateOrdersAddressService } from '@/services/orders-addresses/update-orders-address';

@Resolver(() => OrdersAddress)
export class UpdateOrdersAddressResolver {
  constructor(
    private readonly updateOrdersAddressService: UpdateOrdersAddressService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrdersAddress)
  async updateOrdersAddress(@Args('input') data: UpdateOrdersAddressInput) {
    const response = await this.updateOrdersAddressService.execute(data);
    return response;
  }
}
