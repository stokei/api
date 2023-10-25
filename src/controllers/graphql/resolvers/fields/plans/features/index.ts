import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { FeaturesLoader } from '@/controllers/graphql/dataloaders/features.loader';
import { Features } from '@/controllers/graphql/types/features';
import { Plan } from '@/controllers/graphql/types/plan';
import { PlanModel } from '@/models/plan.model';
import { GetOrSetCacheService } from '@/services/cache/get-or-set-cache';

@Resolver(() => Plan)
export class PlanFeaturesResolver {
  constructor(
    private readonly featuresLoader: FeaturesLoader,
    private readonly getOrSetCacheService: GetOrSetCacheService
  ) {}

  @ResolveField(() => Features, { nullable: true })
  async features(@Parent() plan: PlanModel) {
    return await this.getOrSetCacheService.execute(
      PlanFeaturesResolver.name + plan.id,
      () => this.featuresLoader.findByParentIds.load(plan.id)
    );
  }
}
