import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveProductsImageInput } from '@/controllers/graphql/inputs/products-images/remove-products-image.input';
import { ProductsImage } from '@/controllers/graphql/types/products-image';
import { RemoveProductsImageService } from '@/services/products-images/remove-products-image';

@Resolver(() => ProductsImage)
export class RemoveProductsImageResolver {
  constructor(
    private readonly removeProductsImageService: RemoveProductsImageService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => ProductsImage)
  async removeProductsImage(
    @Args('input') data: RemoveProductsImageInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeProductsImageService.execute(data);
    return response;
  }
}
