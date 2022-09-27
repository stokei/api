import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { Price } from '@/controllers/graphql/types/price';
import { Product } from '@/controllers/graphql/types/product';
import { PriceModel } from '@/models/price.model';

@Resolver(() => Price)
export class PriceProductResolver {
  constructor(private readonly productsLoader: ProductsLoader) {}

  @ResolveField(() => Product, { nullable: true })
  product(@Parent() price: PriceModel) {
    return price.parent && this.productsLoader.findByIds.load(price.parent);
  }
}
