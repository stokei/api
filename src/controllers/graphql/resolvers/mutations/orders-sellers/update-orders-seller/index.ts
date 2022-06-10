import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateOrdersSellerInput } from '@/controllers/graphql/inputs/orders-sellers/update-orders-seller.input';
import { OrdersSeller } from '@/controllers/graphql/types/orders-seller';
import { UpdateOrdersSellerService } from '@/services/orders-sellers/update-orders-seller';

@Resolver(() => OrdersSeller)
export class UpdateOrdersSellerResolver {
  constructor(
    private readonly updateOrdersSellerService: UpdateOrdersSellerService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrdersSeller)
  async updateOrdersSeller(@Args('input') data: UpdateOrdersSellerInput) {
    const response = await this.updateOrdersSellerService.execute(data);
    return response;
  }
}
