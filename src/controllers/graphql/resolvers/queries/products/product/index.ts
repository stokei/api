import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { Product } from '@/controllers/graphql/types/product';
import { ProductNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productsLoader: ProductsLoader) {}

  @Query(() => Product)
  async product(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const product = await this.productsLoader.findByIds.load(id);
    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  }
}
