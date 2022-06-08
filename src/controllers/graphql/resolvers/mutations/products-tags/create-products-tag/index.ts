import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateProductsTagInput } from '@/controllers/graphql/inputs/products-tags/create-products-tag.input';
import { ProductsTag } from '@/controllers/graphql/types/products-tag';
import { CreateProductsTagService } from '@/services/products-tags/create-products-tag';

@Resolver(() => ProductsTag)
export class CreateProductsTagResolver {
  constructor(
    private readonly createProductsTagService: CreateProductsTagService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProductsTag)
  async createProductsTag(
    @Args('input') data: CreateProductsTagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createProductsTagService.execute(data);
    return response;
  }
}
