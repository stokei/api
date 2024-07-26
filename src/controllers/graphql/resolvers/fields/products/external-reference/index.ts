import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { MaterialsLoader } from '@/controllers/graphql/dataloaders/materials.loader';
import { PlansLoader } from '@/controllers/graphql/dataloaders/plans.loader';
import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import {
  Product,
  ProductExternalReferenceUnion
} from '@/controllers/graphql/types/product';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductExternalReferenceResolver {
  constructor(
    private readonly appsLoader: AppsLoader,
    private readonly coursesLoader: CoursesLoader,
    private readonly materialsLoader: MaterialsLoader,
    private readonly productsLoader: ProductsLoader,
    private readonly plansLoader: PlansLoader
  ) {}

  @ResolveField(() => ProductExternalReferenceUnion, { nullable: true })
  async externalReference(@Parent() product: ProductModel) {
    const getItem = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.APPS]: () =>
          this.appsLoader.findByIds.load(product.externalReference),
        [ServerStokeiApiIdPrefix.PRODUCTS]: () =>
          this.productsLoader.findByIds.load(product.externalReference),
        [ServerStokeiApiIdPrefix.COURSES]: () =>
          this.coursesLoader.findByIds.load(product.externalReference),
        [ServerStokeiApiIdPrefix.MATERIALS]: () =>
          this.materialsLoader.findByIds.load(product.externalReference),
        [ServerStokeiApiIdPrefix.PLANS]: () =>
          this.plansLoader.findByIds.load(product.externalReference)
      };
      const serviceName = splitServiceId(product.externalReference)?.service;
      return handlers?.[serviceName];
    };
    const getItemHandler = await getItem();
    return product.externalReference && getItemHandler?.();
  }
}
