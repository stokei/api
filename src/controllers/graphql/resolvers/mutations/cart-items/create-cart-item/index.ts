import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateCartItemInput } from '@/controllers/graphql/inputs/cart-items/create-cart-item.input';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { CreateCartItemService } from '@/services/cart-items/create-cart-item';

@Resolver(() => CartItem)
export class CreateCartItemResolver {
  constructor(private readonly createCartItemService: CreateCartItemService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CartItem)
  async createCartItem(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateCartItemInput
  ) {
    const response = await this.createCartItemService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
