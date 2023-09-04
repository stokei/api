import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { Image } from '@/controllers/graphql/types/image';
import { Product } from '@/controllers/graphql/types/product';
import { ImageModel } from '@/models/image.model';
import { ProductModel } from '@/models/product.model';
import { FindProductParentByParentService } from '@/services/products/find-product-parent-by-parent';

@Resolver(() => Product)
export class ProductAvatarResolver {
  constructor(
    private readonly imagesLoader: ImagesLoader,
    private readonly findProductParentByParentService: FindProductParentByParentService
  ) {}

  @ResolveField(() => Image, { nullable: true })
  async avatar(@Parent() product: ProductModel) {
    let image: ImageModel;
    if (product.avatar) {
      try {
        image = await this.imagesLoader.findByIds.load(product.avatar);
        if (image) {
          return image;
        }
      } catch (error) {}
    }
    if (!product.parent) {
      return;
    }
    try {
      const parent = await this.findProductParentByParentService.execute(
        product.parent
      );
      const parentAvatar = (parent as any)?.avatar;
      if (!parentAvatar) {
        return;
      }
      return await this.imagesLoader.findByIds.load(parentAvatar);
    } catch (error) {
      return;
    }
  }
}
