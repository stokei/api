import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateProductInput } from '@/controllers/graphql/inputs/products/update-product.input';
import { Product } from '@/controllers/graphql/types/product';
import { UpdateProductService } from '@/services/products/update-product';

@Resolver(() => Product)
export class UpdateProductResolver {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Product)
  async updateProduct(@Args('input') data: UpdateProductInput) {
    const response = await this.updateProductService.execute(data);
    return response;
  }
}
