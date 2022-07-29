import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCartItemInput } from '@/controllers/graphql/inputs/cart-items/create-cart-item.input';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { CreateCartItemService } from '@/services/cart-items/create-cart-item';

@Resolver(() => CartItem)
export class CreateCartItemResolver {
  constructor(private readonly createCartItemService: CreateCartItemService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => CartItem)
  async createCartItem(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateCartItemInput
  ) {
    const response = await this.createCartItemService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
