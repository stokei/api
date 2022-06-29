import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateProductInput } from '@/controllers/graphql/inputs/products/create-product.input';
import { Product } from '@/controllers/graphql/types/product';
import { CreateProductService } from '@/services/products/create-product';

@Resolver(() => Product)
export class CreateProductResolver {
  constructor(private readonly createProductService: CreateProductService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Product)
  async createProduct(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateProductInput
  ) {
    const response = await this.createProductService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
