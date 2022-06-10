import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateCheckoutInput } from '@/controllers/graphql/inputs/checkouts/create-checkout.input';
import { Checkout } from '@/controllers/graphql/types/checkout';
import { CreateCheckoutService } from '@/services/checkouts/create-checkout';

@Resolver(() => Checkout)
export class CreateCheckoutResolver {
  constructor(private readonly createCheckoutService: CreateCheckoutService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Checkout)
  async createCheckout(@Args('input') data: CreateCheckoutInput) {
    const response = await this.createCheckoutService.execute(data);
    return response;
  }
}
