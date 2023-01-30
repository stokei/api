import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { FilesLoader } from '@/controllers/graphql/dataloaders/files.loader';
import { File } from '@/controllers/graphql/types/file';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductAvatarResolver {
  constructor(private readonly filesLoader: FilesLoader) {}

  @ResolveField(() => File, { nullable: true })
  avatar(@Parent() product: ProductModel) {
    return product.avatar && this.filesLoader.findByIds.load(product.avatar);
  }
}
