import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateProductsCategoryInput } from '@/controllers/graphql/inputs/products-categories/update-products-category.input';
import { ProductsCategory } from '@/controllers/graphql/types/products-category';
import { UpdateProductsCategoryService } from '@/services/products-categories/update-products-category';

@Resolver(() => ProductsCategory)
export class UpdateProductsCategoryResolver {
  constructor(
    private readonly updateProductsCategoryService: UpdateProductsCategoryService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProductsCategory)
  async updateProductsCategory(
    @Args('input') data: UpdateProductsCategoryInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateProductsCategoryService.execute(data);
    return response;
  }
}
