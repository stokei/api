import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveCartsItemInput } from '@/controllers/graphql/inputs/carts-items/remove-carts-item.input';
import { CartsItem } from '@/controllers/graphql/types/carts-item';
import { RemoveCartsItemService } from '@/services/carts-items/remove-carts-item';

@Resolver(() => CartsItem)
export class RemoveCartsItemResolver {
  constructor(
    private readonly removeCartsItemService: RemoveCartsItemService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CartsItem)
  async removeCartsItem(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveCartsItemInput
  ) {
    const response = await this.removeCartsItemService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
