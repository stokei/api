import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateProductsTagInput } from '@/controllers/graphql/inputs/products-tags/update-products-tag.input';
import { ProductsTag } from '@/controllers/graphql/types/products-tag';
import { UpdateProductsTagService } from '@/services/products-tags/update-products-tag';

@Resolver(() => ProductsTag)
export class UpdateProductsTagResolver {
  constructor(
    private readonly updateProductsTagService: UpdateProductsTagService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ProductsTag)
  async updateProductsTag(@Args('input') data: UpdateProductsTagInput) {
    const response = await this.updateProductsTagService.execute(data);
    return response;
  }
}
