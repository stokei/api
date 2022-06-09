import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateProductsCategoryInput } from '@/controllers/graphql/inputs/products-categories/create-products-category.input';
import { ProductsCategory } from '@/controllers/graphql/types/products-category';
import { CreateProductsCategoryService } from '@/services/products-categories/create-products-category';

@Resolver(() => ProductsCategory)
export class CreateProductsCategoryResolver {
  constructor(
    private readonly createProductsCategoryService: CreateProductsCategoryService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProductsCategory)
  async createProductsCategory(
    @Args('input') data: CreateProductsCategoryInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createProductsCategoryService.execute(data);
    return response;
  }
}
