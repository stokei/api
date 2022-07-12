import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateCartItemInput } from '@/controllers/graphql/inputs/cart-items/update-cart-item.input';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { UpdateCartItemService } from '@/services/cart-items/update-cart-item';

@Resolver(() => CartItem)
export class UpdateCartItemResolver {
  constructor(private readonly updateCartItemService: UpdateCartItemService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CartItem)
  async updateCartItem(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateCartItemInput
  ) {
    const response = await this.updateCartItemService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
