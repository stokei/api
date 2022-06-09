import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateProductsImageInput } from '@/controllers/graphql/inputs/products-images/create-products-image.input';
import { ProductsImage } from '@/controllers/graphql/types/products-image';
import { CreateProductsImageService } from '@/services/products-images/create-products-image';

@Resolver(() => ProductsImage)
export class CreateProductsImageResolver {
  constructor(
    private readonly createProductsImageService: CreateProductsImageService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProductsImage)
  async createProductsImage(
    @Args('input') data: CreateProductsImageInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createProductsImageService.execute(data);
    return response;
  }
}
