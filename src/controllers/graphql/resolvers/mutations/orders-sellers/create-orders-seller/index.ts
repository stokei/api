import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateOrdersSellerInput } from '@/controllers/graphql/inputs/orders-sellers/create-orders-seller.input';
import { OrdersSeller } from '@/controllers/graphql/types/orders-seller';
import { CreateOrdersSellerService } from '@/services/orders-sellers/create-orders-seller';

@Resolver(() => OrdersSeller)
export class CreateOrdersSellerResolver {
  constructor(
    private readonly createOrdersSellerService: CreateOrdersSellerService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => OrdersSeller)
  async createOrdersSeller(
    @Args('input') data: CreateOrdersSellerInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createOrdersSellerService.execute(data);
    return response;
  }
}
