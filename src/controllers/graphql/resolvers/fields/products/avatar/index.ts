import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { ImagesLoader } from '@/controllers/graphql/dataloaders/images.loader';
import { MaterialsLoader } from '@/controllers/graphql/dataloaders/materials.loader';
import { PlansLoader } from '@/controllers/graphql/dataloaders/plans.loader';
import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import { Image } from '@/controllers/graphql/types/image';
import { Product } from '@/controllers/graphql/types/product';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ImageModel } from '@/models/image.model';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductAvatarResolver {
  constructor(
    private readonly imagesLoader: ImagesLoader,
    private readonly appsLoader: AppsLoader,
    private readonly productsLoader: ProductsLoader,
    private readonly coursesLoader: CoursesLoader,
    private readonly materialsLoader: MaterialsLoader,
    private readonly plansLoader: PlansLoader
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
    if (!product.externalReference) {
      return;
    }
    try {
      const externalReference =
        await this.findProductExternalReferenceByExternalReferenceService(
          product.externalReference
        );
      const externalReferenceAvatar = (externalReference as any)?.avatar;
      if (!externalReferenceAvatar) {
        return;
      }
      return await this.imagesLoader.findByIds.load(externalReferenceAvatar);
    } catch (error) {
      return;
    }
  }

  private async findProductExternalReferenceByExternalReferenceService(
    externalReference: string
  ) {
    const getItem = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.APPS]: () =>
          this.appsLoader.findByIds.load(externalReference),
        [ServerStokeiApiIdPrefix.PRODUCTS]: () =>
          this.productsLoader.findByIds.load(externalReference),
        [ServerStokeiApiIdPrefix.COURSES]: () =>
          this.coursesLoader.findByIds.load(externalReference),
        [ServerStokeiApiIdPrefix.MATERIALS]: () =>
          this.materialsLoader.findByIds.load(externalReference),
        [ServerStokeiApiIdPrefix.PLANS]: () =>
          this.plansLoader.findByIds.load(externalReference)
      };
      const serviceName = splitServiceId(externalReference)?.service;
      return handlers?.[serviceName];
    };
    const getItemHandler = await getItem();
    const externalReferenceModel =
      externalReference && (await getItemHandler?.());
    return externalReferenceModel;
  }
}
