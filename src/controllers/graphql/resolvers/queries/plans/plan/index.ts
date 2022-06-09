import { Args, Query, Resolver } from '@nestjs/graphql';

import { PlansLoader } from '@/controllers/graphql/dataloaders/plans.loader';
import { Plan } from '@/controllers/graphql/types/plan';
import { ParamNotFoundException, PlanNotFoundException } from '@/errors';

@Resolver(() => Plan)
export class PlanResolver {
  constructor(private readonly plansLoader: PlansLoader) {}

  @Query(() => Plan)
  async plan(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const plan = await this.plansLoader.findByIds.load(id);
    if (!plan) {
      throw new PlanNotFoundException();
    }
    return plan;
  }
}
