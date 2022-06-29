import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveCartInput } from '@/controllers/graphql/inputs/carts/remove-cart.input';
import { Cart } from '@/controllers/graphql/types/cart';
import { RemoveCartService } from '@/services/carts/remove-cart';

@Resolver(() => Cart)
export class RemoveCartResolver {
  constructor(private readonly removeCartService: RemoveCartService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Cart)
  async removeCart(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveCartInput
  ) {
    const response = await this.removeCartService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
