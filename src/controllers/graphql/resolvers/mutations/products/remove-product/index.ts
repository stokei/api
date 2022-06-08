import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveProductInput } from '@/controllers/graphql/inputs/products/remove-product.input';
import { Product } from '@/controllers/graphql/types/product';
import { RemoveProductService } from '@/services/products/remove-product';

@Resolver(() => Product)
export class RemoveProductResolver {
  constructor(private readonly removeProductService: RemoveProductService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Product)
  async removeProduct(
    @Args('input') data: RemoveProductInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeProductService.execute(data);
    return response;
  }
}
