import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveProductInput } from '@/controllers/graphql/inputs/products/remove-product.input';
import { Product } from '@/controllers/graphql/types/product';
import { RemoveProductService } from '@/services/products/remove-product';

@Resolver(() => Product)
export class RemoveProductResolver {
  constructor(private readonly removeProductService: RemoveProductService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Product)
  async removeProduct(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveProductInput
  ) {
    const response = await this.removeProductService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
