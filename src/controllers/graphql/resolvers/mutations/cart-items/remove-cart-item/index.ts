import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveCartItemInput } from '@/controllers/graphql/inputs/cart-items/remove-cart-item.input';
import { CartItem } from '@/controllers/graphql/types/cart-item';
import { RemoveCartItemService } from '@/services/cart-items/remove-cart-item';

@Resolver(() => CartItem)
export class RemoveCartItemResolver {
  constructor(private readonly removeCartItemService: RemoveCartItemService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => CartItem)
  async removeCartItem(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveCartItemInput
  ) {
    const response = await this.removeCartItemService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
