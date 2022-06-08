import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductsTagsLoader } from '@/controllers/graphql/dataloaders/products-tags.loader';
import { ProductsTag } from '@/controllers/graphql/types/products-tag';
import { ProductsTagNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => ProductsTag)
export class ProductsTagResolver {
  constructor(private readonly productsTagsLoader: ProductsTagsLoader) {}

  @Query(() => ProductsTag)
  async productsTag(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const productsTag = await this.productsTagsLoader.findByIds.load(id);
    if (!productsTag) {
      throw new ProductsTagNotFoundException();
    }
    return productsTag;
  }
}
