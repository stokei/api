import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveCategoryInput } from '@/controllers/graphql/inputs/categories/remove-category.input';
import { Category } from '@/controllers/graphql/types/category';
import { RemoveCategoryService } from '@/services/categories/remove-category';

@Resolver(() => Category)
export class RemoveCategoryResolver {
  constructor(private readonly removeCategoryService: RemoveCategoryService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Category)
  async removeCategory(
    @Args('input') data: RemoveCategoryInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCategoryService.execute(data);
    return response;
  }
}
