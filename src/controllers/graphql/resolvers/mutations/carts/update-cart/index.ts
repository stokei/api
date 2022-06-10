import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateCartInput } from '@/controllers/graphql/inputs/carts/update-cart.input';
import { Cart } from '@/controllers/graphql/types/cart';
import { UpdateCartService } from '@/services/carts/update-cart';

@Resolver(() => Cart)
export class UpdateCartResolver {
  constructor(private readonly updateCartService: UpdateCartService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Cart)
  async updateCart(@Args('input') data: UpdateCartInput) {
    const response = await this.updateCartService.execute(data);
    return response;
  }
}
