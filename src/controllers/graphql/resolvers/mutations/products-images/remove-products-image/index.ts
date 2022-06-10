import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveProductsImageInput } from '@/controllers/graphql/inputs/products-images/remove-products-image.input';
import { ProductsImage } from '@/controllers/graphql/types/products-image';
import { RemoveProductsImageService } from '@/services/products-images/remove-products-image';

@Resolver(() => ProductsImage)
export class RemoveProductsImageResolver {
  constructor(
    private readonly removeProductsImageService: RemoveProductsImageService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ProductsImage)
  async removeProductsImage(@Args('input') data: RemoveProductsImageInput) {
    const response = await this.removeProductsImageService.execute(data);
    return response;
  }
}
