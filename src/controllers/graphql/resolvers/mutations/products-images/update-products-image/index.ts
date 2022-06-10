import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateProductsImageInput } from '@/controllers/graphql/inputs/products-images/update-products-image.input';
import { ProductsImage } from '@/controllers/graphql/types/products-image';
import { UpdateProductsImageService } from '@/services/products-images/update-products-image';

@Resolver(() => ProductsImage)
export class UpdateProductsImageResolver {
  constructor(
    private readonly updateProductsImageService: UpdateProductsImageService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ProductsImage)
  async updateProductsImage(@Args('input') data: UpdateProductsImageInput) {
    const response = await this.updateProductsImageService.execute(data);
    return response;
  }
}
