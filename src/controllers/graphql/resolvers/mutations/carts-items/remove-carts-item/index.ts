import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveCartsItemInput } from '@/controllers/graphql/inputs/carts-items/remove-carts-item.input';
import { CartsItem } from '@/controllers/graphql/types/carts-item';
import { RemoveCartsItemService } from '@/services/carts-items/remove-carts-item';

@Resolver(() => CartsItem)
export class RemoveCartsItemResolver {
  constructor(
    private readonly removeCartsItemService: RemoveCartsItemService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CartsItem)
  async removeCartsItem(
    @Args('input') data: RemoveCartsItemInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCartsItemService.execute(data);
    return response;
  }
}
