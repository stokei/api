import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateCategoryInput } from '@/controllers/graphql/inputs/categories/create-category.input';
import { Category } from '@/controllers/graphql/types/category';
import { CreateCategoryService } from '@/services/categories/create-category';

@Resolver(() => Category)
export class CreateCategoryResolver {
  constructor(private readonly createCategoryService: CreateCategoryService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Category)
  async createCategory(
    @Args('input') data: CreateCategoryInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCategoryService.execute(data);
    return response;
  }
}
