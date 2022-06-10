import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateCategoryInput } from '@/controllers/graphql/inputs/categories/update-category.input';
import { Category } from '@/controllers/graphql/types/category';
import { UpdateCategoryService } from '@/services/categories/update-category';

@Resolver(() => Category)
export class UpdateCategoryResolver {
  constructor(private readonly updateCategoryService: UpdateCategoryService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Category)
  async updateCategory(@Args('input') data: UpdateCategoryInput) {
    const response = await this.updateCategoryService.execute(data);
    return response;
  }
}
