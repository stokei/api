import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateProductInput } from '@/controllers/graphql/inputs/products/create-product.input';
import { Product } from '@/controllers/graphql/types/product';
import { CreateProductService } from '@/services/products/create-product';

@Resolver(() => Product)
export class CreateProductResolver {
  constructor(private readonly createProductService: CreateProductService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Product)
  async createProduct(
    @Args('input') data: CreateProductInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createProductService.execute(data);
    return response;
  }
}
