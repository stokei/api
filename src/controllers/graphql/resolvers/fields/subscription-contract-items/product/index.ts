import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { CoursesLoader } from '@/controllers/graphql/dataloaders/courses.loader';
import { MaterialsLoader } from '@/controllers/graphql/dataloaders/materials.loader';
import { PlansLoader } from '@/controllers/graphql/dataloaders/plans.loader';
import { ProductsLoader } from '@/controllers/graphql/dataloaders/products.loader';
import {
  SubscriptionContractItem,
  SubscriptionContractItemProductUnion
} from '@/controllers/graphql/types/subscription-contract-item';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';

@Resolver(() => SubscriptionContractItem)
export class SubscriptionContractItemProductResolver {
  constructor(
    private readonly coursesLoader: CoursesLoader,
    private readonly materialsLoader: MaterialsLoader,
    private readonly productsLoader: ProductsLoader,
    private readonly plansLoader: PlansLoader
  ) {}

  @ResolveField(() => SubscriptionContractItemProductUnion, { nullable: true })
  async product(@Parent() sortedItem: SubscriptionContractItemModel) {
    const getItem = () => {
      const handlers = {
        [ServerStokeiApiIdPrefix.COURSES]: () =>
          this.coursesLoader.findByIds.load(sortedItem.product),
        [ServerStokeiApiIdPrefix.PRODUCTS]: () =>
          this.productsLoader.findByIds.load(sortedItem.product),
        [ServerStokeiApiIdPrefix.MATERIALS]: () =>
          this.materialsLoader.findByIds.load(sortedItem.product),
        [ServerStokeiApiIdPrefix.PLANS]: () =>
          this.plansLoader.findByIds.load(sortedItem.product)
      };
      const serviceName = splitServiceId(sortedItem.product)?.service;
      return handlers?.[serviceName];
    };
    const getItemHandler = await getItem();
    return sortedItem.product && getItemHandler?.();
  }
}
