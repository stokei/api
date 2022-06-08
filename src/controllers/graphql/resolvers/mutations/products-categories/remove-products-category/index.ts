import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveProductsCategoryInput } from '@/controllers/graphql/inputs/products-categories/remove-products-category.input';
import { ProductsCategory } from '@/controllers/graphql/types/products-category';
import { RemoveProductsCategoryService } from '@/services/products-categories/remove-products-category';

@Resolver(() => ProductsCategory)
export class RemoveProductsCategoryResolver {
  constructor(
    private readonly removeProductsCategoryService: RemoveProductsCategoryService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProductsCategory)
  async removeProductsCategory(
    @Args('input') data: RemoveProductsCategoryInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeProductsCategoryService.execute(data);
    return response;
  }
}
