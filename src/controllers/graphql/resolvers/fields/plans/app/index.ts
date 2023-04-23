import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { AppsLoader } from '@/controllers/graphql/dataloaders/apps.loader';
import { App } from '@/controllers/graphql/types/app';
import { Plan } from '@/controllers/graphql/types/plan';
import { PlanModel } from '@/models/plan.model';

@Resolver(() => Plan)
export class PlanAppResolver {
  constructor(private readonly appsLoader: AppsLoader) {}

  @ResolveField(() => App, { nullable: true })
  app(@Parent() plan: PlanModel) {
    return plan.app && this.appsLoader.findByIds.load(plan.app);
  }
}
