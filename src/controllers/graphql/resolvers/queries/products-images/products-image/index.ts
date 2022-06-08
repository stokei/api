import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductsImagesLoader } from '@/controllers/graphql/dataloaders/products-images.loader';
import { ProductsImage } from '@/controllers/graphql/types/products-image';
import {
  ProductsImageNotFoundException,
  ParamNotFoundException
} from '@/errors';

@Resolver(() => ProductsImage)
export class ProductsImageResolver {
  constructor(private readonly productsImagesLoader: ProductsImagesLoader) {}

  @Query(() => ProductsImage)
  async productsImage(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const productsImage = await this.productsImagesLoader.findByIds.load(id);
    if (!productsImage) {
      throw new ProductsImageNotFoundException();
    }
    return productsImage;
  }
}
