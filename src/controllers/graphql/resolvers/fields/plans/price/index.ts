import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { PricesLoader } from '@/controllers/graphql/dataloaders/prices.loader';
import { Plan } from '@/controllers/graphql/types/plan';
import { Price } from '@/controllers/graphql/types/price';
import { PlanModel } from '@/models/plan.model';

@Resolver(() => Plan)
export class PlanPriceResolver {
  constructor(private readonly pricesLoader: PricesLoader) {}

  @ResolveField(() => Price, { nullable: true })
  price(@Parent() plan: PlanModel) {
    return plan.price && this.pricesLoader.findByIds.load(plan.price);
  }
}
