import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { FindProductsBestSellerByPeriodInput } from '@/controllers/graphql/inputs/products/find-products-best-seller-by-period.input';
import { ProductBestSeller } from '@/controllers/graphql/types/product-best-seller';
import { FindProductsBestSellerByPeriodService } from '@/services/products/find-products-best-seller-by-period';

@Resolver(() => ProductBestSeller)
export class ProductsBestSellerByPeriodResolver {
  constructor(
    private readonly findProductsBestSellerByPeriodService: FindProductsBestSellerByPeriodService
  ) {}

  @UseGuards(AppGuard)
  @Query(() => [ProductBestSeller])
  async productsBestSellerByPeriod(
    @CurrentApp('id') app: string,
    @Args('where', { type: () => FindProductsBestSellerByPeriodInput })
    where: FindProductsBestSellerByPeriodInput
  ) {
    return await this.findProductsBestSellerByPeriodService.execute({
      ...where,
      app
    });
  }
}
