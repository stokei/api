import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { splitServiceId } from '@stokei/nestjs';

import { PlansLoader } from '@/controllers/graphql/dataloaders/plans.loader';
import { Plan } from '@/controllers/graphql/types/plan';
import { Product } from '@/controllers/graphql/types/product';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductModel } from '@/models/product.model';

@Resolver(() => Product)
export class ProductPlanResolver {
  constructor(private readonly plansLoader: PlansLoader) {}

  @ResolveField(() => Plan, { nullable: true })
  plan(@Parent() product: ProductModel) {
    if (
      product.parent &&
      splitServiceId(product.parent)?.service === ServerStokeiApiIdPrefix.PLANS
    ) {
      return this.plansLoader.findByIds.load(product.parent);
    }
  }
}
