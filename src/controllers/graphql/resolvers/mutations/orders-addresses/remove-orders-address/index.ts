import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveOrdersAddressInput } from '@/controllers/graphql/inputs/orders-addresses/remove-orders-address.input';
import { OrdersAddress } from '@/controllers/graphql/types/orders-address';
import { RemoveOrdersAddressService } from '@/services/orders-addresses/remove-orders-address';

@Resolver(() => OrdersAddress)
export class RemoveOrdersAddressResolver {
  constructor(
    private readonly removeOrdersAddressService: RemoveOrdersAddressService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrdersAddress)
  async removeOrdersAddress(@Args('input') data: RemoveOrdersAddressInput) {
    const response = await this.removeOrdersAddressService.execute(data);
    return response;
  }
}
