import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateCartsItemInput } from '@/controllers/graphql/inputs/carts-items/update-carts-item.input';
import { CartsItem } from '@/controllers/graphql/types/carts-item';
import { UpdateCartsItemService } from '@/services/carts-items/update-carts-item';

@Resolver(() => CartsItem)
export class UpdateCartsItemResolver {
  constructor(
    private readonly updateCartsItemService: UpdateCartsItemService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => CartsItem)
  async updateCartsItem(@Args('input') data: UpdateCartsItemInput) {
    const response = await this.updateCartsItemService.execute(data);
    return response;
  }
}
