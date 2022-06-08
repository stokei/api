import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateCartsItemInput } from '@/controllers/graphql/inputs/carts-items/create-carts-item.input';
import { CartsItem } from '@/controllers/graphql/types/carts-item';
import { CreateCartsItemService } from '@/services/carts-items/create-carts-item';

@Resolver(() => CartsItem)
export class CreateCartsItemResolver {
  constructor(
    private readonly createCartsItemService: CreateCartsItemService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => CartsItem)
  async createCartsItem(
    @Args('input') data: CreateCartsItemInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCartsItemService.execute(data);
    return response;
  }
}
