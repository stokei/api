import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationMapper } from '@stokei/nestjs';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { Prices } from '@/controllers/graphql/types/prices';
import { Product } from '@/controllers/graphql/types/product';
import { PriceModel } from '@/models/price.model';
import { ProductModel } from '@/models/product.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => Product)
export class ProductPricesResolver {
  constructor(
    private readonly pricesLoader: PricesLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @ResolveField(() => Prices, { nullable: true })
  async prices(@Parent() product: ProductModel) {
    return await this.getOrSetCacheService.execute(
      ProductPricesResolver.name + product.id,
      async () => {
        const items = (
          await this.pricesLoader.findByParentIds.load(product.id)
        )?.items?.filter((price) => !!price.active);

        return new PaginationMapper<PriceModel>().toPaginationList({
          totalCount: items?.length || 0,
          items
        });
      }
    );
  }
}
