import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateProductsTagInput } from '@/controllers/graphql/inputs/products-tags/create-products-tag.input';
import { ProductsTag } from '@/controllers/graphql/types/products-tag';
import { CreateProductsTagService } from '@/services/products-tags/create-products-tag';

@Resolver(() => ProductsTag)
export class CreateProductsTagResolver {
  constructor(
    private readonly createProductsTagService: CreateProductsTagService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ProductsTag)
  async createProductsTag(@Args('input') data: CreateProductsTagInput) {
    const response = await this.createProductsTagService.execute(data);
    return response;
  }
}
