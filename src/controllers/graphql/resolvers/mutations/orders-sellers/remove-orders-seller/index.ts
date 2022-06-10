import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveOrdersSellerInput } from '@/controllers/graphql/inputs/orders-sellers/remove-orders-seller.input';
import { OrdersSeller } from '@/controllers/graphql/types/orders-seller';
import { RemoveOrdersSellerService } from '@/services/orders-sellers/remove-orders-seller';

@Resolver(() => OrdersSeller)
export class RemoveOrdersSellerResolver {
  constructor(
    private readonly removeOrdersSellerService: RemoveOrdersSellerService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => OrdersSeller)
  async removeOrdersSeller(@Args('input') data: RemoveOrdersSellerInput) {
    const response = await this.removeOrdersSellerService.execute(data);
    return response;
  }
}
