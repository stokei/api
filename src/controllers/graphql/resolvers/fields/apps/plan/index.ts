import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { App } from '@/controllers/graphql/types/app';
import { Plan } from '@/controllers/graphql/types/plan';
import { AppModel } from '@/models/app.model';
import { FindAppCurrentPlanService } from '@/services/apps/find-app-current-plan';

@Resolver(() => App)
export class AppPlanResolver {
  constructor(
    private readonly findAppCurrentPlanService: FindAppCurrentPlanService
  ) {}

  @ResolveField(() => Plan, { nullable: true })
  plan(@Parent() app: AppModel) {
    return app.id && this.findAppCurrentPlanService.execute(app.id);
  }
}
