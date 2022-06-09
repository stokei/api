import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveOrdersSellerInput } from '@/controllers/graphql/inputs/orders-sellers/remove-orders-seller.input';
import { OrdersSeller } from '@/controllers/graphql/types/orders-seller';
import { RemoveOrdersSellerService } from '@/services/orders-sellers/remove-orders-seller';

@Resolver(() => OrdersSeller)
export class RemoveOrdersSellerResolver {
  constructor(
    private readonly removeOrdersSellerService: RemoveOrdersSellerService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => OrdersSeller)
  async removeOrdersSeller(
    @Args('input') data: RemoveOrdersSellerInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeOrdersSellerService.execute(data);
    return response;
  }
}
