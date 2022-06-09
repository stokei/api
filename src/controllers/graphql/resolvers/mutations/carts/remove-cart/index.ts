import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveCartInput } from '@/controllers/graphql/inputs/carts/remove-cart.input';
import { Cart } from '@/controllers/graphql/types/cart';
import { RemoveCartService } from '@/services/carts/remove-cart';

@Resolver(() => Cart)
export class RemoveCartResolver {
  constructor(private readonly removeCartService: RemoveCartService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Cart)
  async removeCart(
    @Args('input') data: RemoveCartInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCartService.execute(data);
    return response;
  }
}
