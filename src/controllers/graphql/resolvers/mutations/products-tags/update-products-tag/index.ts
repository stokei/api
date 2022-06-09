import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateProductsTagInput } from '@/controllers/graphql/inputs/products-tags/update-products-tag.input';
import { ProductsTag } from '@/controllers/graphql/types/products-tag';
import { UpdateProductsTagService } from '@/services/products-tags/update-products-tag';

@Resolver(() => ProductsTag)
export class UpdateProductsTagResolver {
  constructor(
    private readonly updateProductsTagService: UpdateProductsTagService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProductsTag)
  async updateProductsTag(
    @Args('input') data: UpdateProductsTagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateProductsTagService.execute(data);
    return response;
  }
}
