import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { FeaturesLoader } from '@/controllers/graphql/dataloaders/features.loader';
import { Features } from '@/controllers/graphql/types/features';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => Product)
export class ProductFeaturesResolver {
  constructor(
    private readonly featuresLoader: FeaturesLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @ResolveField(() => Features, { nullable: true })
  async features(@Parent() product: ProductModel) {
    return await this.getOrSetCacheService.execute(
      ProductFeaturesResolver.name + product.id,
      () => this.featuresLoader.findByParentIds.load(product.id)
    );
  }
}
