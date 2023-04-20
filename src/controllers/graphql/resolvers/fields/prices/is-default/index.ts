import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { Price } from '@/controllers/graphql/types/price';
import { PriceModel } from '@/models/price.model';

@Resolver(() => Price)
export class PriceIsDefaultResolver {
  constructor(private readonly productsLoader: ProductsLoader) {}

  @ResolveField(() => Boolean, { nullable: true })
  async isDefault(@Parent() price: PriceModel) {
    try {
      const product = await this.productsLoader.findByIds.load(price.parent);
      return product.defaultPrice === price.id;
    } catch (e) {
      return false;
    }
  }
}
