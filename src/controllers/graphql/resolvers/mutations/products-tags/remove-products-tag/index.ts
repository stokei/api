import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveProductsTagInput } from '@/controllers/graphql/inputs/products-tags/remove-products-tag.input';
import { ProductsTag } from '@/controllers/graphql/types/products-tag';
import { RemoveProductsTagService } from '@/services/products-tags/remove-products-tag';

@Resolver(() => ProductsTag)
export class RemoveProductsTagResolver {
  constructor(
    private readonly removeProductsTagService: RemoveProductsTagService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ProductsTag)
  async removeProductsTag(@Args('input') data: RemoveProductsTagInput) {
    const response = await this.removeProductsTagService.execute(data);
    return response;
  }
}
