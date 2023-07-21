import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { MaterialsLoader } from '@/controllers/graphql/dataloaders/materials.loader';
import { PlansLoader } from '@/controllers/graphql/dataloaders/plans.loader';
import {
  Product,
  ProductParentUnion
} from '@/controllers/graphql/types/product';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductParentResolver {
  constructor(
    private readonly appsLoader: AppsLoader,
    private readonly coursesLoader: CoursesLoader,
    private readonly materialsLoader: MaterialsLoader,
    private readonly plansLoader: PlansLoader
  ) {}

  @ResolveField(() => ProductParentUnion, { nullable: true })
  async parent(@Parent() product: ProductModel) {
    const getItem = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.APPS]: () =>
          this.appsLoader.findByIds.load(product.parent),
        [ServerStokeiApiIdPrefix.COURSES]: () =>
          this.coursesLoader.findByIds.load(product.parent),
        [ServerStokeiApiIdPrefix.MATERIALS]: () =>
          this.materialsLoader.findByIds.load(product.parent),
        [ServerStokeiApiIdPrefix.PLANS]: () =>
          this.plansLoader.findByIds.load(product.parent)
      };
      const serviceName = splitServiceId(product.parent)?.service;
      return handlers?.[serviceName];
    };
    const getItemHandler = await getItem();
    return product.parent && getItemHandler?.();
  }
}
