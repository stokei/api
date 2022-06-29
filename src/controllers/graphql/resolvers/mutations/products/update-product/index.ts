import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateProductInput } from '@/controllers/graphql/inputs/products/update-product.input';
import { Product } from '@/controllers/graphql/types/product';
import { UpdateProductService } from '@/services/products/update-product';

@Resolver(() => Product)
export class UpdateProductResolver {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Product)
  async updateProduct(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateProductInput
  ) {
    const response = await this.updateProductService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
