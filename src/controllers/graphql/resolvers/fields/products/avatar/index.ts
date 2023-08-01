import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Image } from '@/controllers/graphql/types/image';
import { Product } from '@/controllers/graphql/types/product';
import { ProductModel } from '@/models/product.model';
import { FindProductParentByIdParentService } from '@/services/products/find-product-parent-by-parent';

@Resolver(() => Product)
export class ProductAvatarResolver {
  constructor(
    private readonly imagesLoader: ImagesLoader,
    private readonly findProductParentByIdParentService: FindProductParentByIdParentService
  ) {}

  @ResolveField(() => Image, { nullable: true })
  async avatar(@Parent() product: ProductModel) {
    const parent = await this.findProductParentByIdParentService.execute(
      product.parent
    );
    return this.imagesLoader.findByIds.load(
      product.avatar || (parent as any)?.avatar
    );
  }
}
