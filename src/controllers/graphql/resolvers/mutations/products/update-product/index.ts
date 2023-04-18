import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateProductInput } from '@/controllers/graphql/inputs/products/update-product.input';
import { Product } from '@/controllers/graphql/types/product';
import { UpdateProductService } from '@/services/products/update-product';

@Resolver(() => Product)
export class UpdateProductResolver {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Product)
  async updateProduct(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateProductInput
  ) {
    const response = await this.updateProductService.execute({
      ...data,
      where: {
        ...data.where,
        app: appId
      },
      data: {
        ...data.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
