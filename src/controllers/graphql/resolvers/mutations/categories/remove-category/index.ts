import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveCategoryInput } from '@/controllers/graphql/inputs/categories/remove-category.input';
import { Category } from '@/controllers/graphql/types/category';
import { RemoveCategoryService } from '@/services/categories/remove-category';

@Resolver(() => Category)
export class RemoveCategoryResolver {
  constructor(private readonly removeCategoryService: RemoveCategoryService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Category)
  async removeCategory(@Args('input') data: RemoveCategoryInput) {
    const response = await this.removeCategoryService.execute(data);
    return response;
  }
}
