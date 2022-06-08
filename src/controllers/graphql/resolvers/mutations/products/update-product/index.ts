import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateProductInput } from '@/controllers/graphql/inputs/products/update-product.input';
import { Product } from '@/controllers/graphql/types/product';
import { UpdateProductService } from '@/services/products/update-product';

@Resolver(() => Product)
export class UpdateProductResolver {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Product)
  async updateProduct(
    @Args('input') data: UpdateProductInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateProductService.execute(data);
    return response;
  }
}
