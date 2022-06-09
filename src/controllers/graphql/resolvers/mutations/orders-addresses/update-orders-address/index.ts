import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateOrdersAddressInput } from '@/controllers/graphql/inputs/orders-addresses/update-orders-address.input';
import { OrdersAddress } from '@/controllers/graphql/types/orders-address';
import { UpdateOrdersAddressService } from '@/services/orders-addresses/update-orders-address';

@Resolver(() => OrdersAddress)
export class UpdateOrdersAddressResolver {
  constructor(
    private readonly updateOrdersAddressService: UpdateOrdersAddressService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => OrdersAddress)
  async updateOrdersAddress(
    @Args('input') data: UpdateOrdersAddressInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateOrdersAddressService.execute(data);
    return response;
  }
}
