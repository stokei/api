import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateCartInput } from '@/controllers/graphql/inputs/carts/create-cart.input';
import { Cart } from '@/controllers/graphql/types/cart';
import { CreateCartService } from '@/services/carts/create-cart';

@Resolver(() => Cart)
export class CreateCartResolver {
  constructor(private readonly createCartService: CreateCartService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Cart)
  async createCart(@Args('input') data: CreateCartInput) {
    const response = await this.createCartService.execute(data);
    return response;
  }
}
