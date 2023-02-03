import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { Price } from '@/controllers/graphql/types/price';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductDefaultPriceResolver {
  constructor(private readonly pricesLoader: PricesLoader) {}

  @ResolveField(() => Price, { nullable: true })
  defaultPrice(@Parent() product: ProductModel) {
    return (
      product.defaultPrice &&
      this.pricesLoader.findByIds.load(product.defaultPrice)
    );
  }
}
