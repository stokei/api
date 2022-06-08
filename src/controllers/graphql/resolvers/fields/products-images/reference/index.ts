import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ProductsImagesLoader } from '@/controllers/graphql/dataloaders/products-images.loader';
import { ProductsImage } from '@/controllers/graphql/types/products-image';

@Resolver(() => ProductsImage)
export class ProductsImageReferenceResolver {
  constructor(private readonly productsImagesLoader: ProductsImagesLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.productsImagesLoader.findByIds.load(reference.id);
  }
}
