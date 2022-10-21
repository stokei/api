import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { extractRequestFromContext } from '@stokei/nestjs';

import { AppNotFoundException, PlanNotFoundException } from '@/errors';
import { AppModel } from '@/models/app.model';
import { FindAppCurrentSubscriptionPlanService } from '@/services/apps/find-app-current-subscription-plan';

@Injectable()
export class AppPlanGuard implements CanActivate {
  constructor(
    private findAppCurrentSubscriptionPlanService: FindAppCurrentSubscriptionPlanService
  ) {}

  getRequest(context: ExecutionContext) {
    return extractRequestFromContext(context);
  }

  async canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);

    const app: AppModel = request?.app;
    if (!app) {
      throw new AppNotFoundException();
    }
    const currentSubscriptionPlan =
      await this.findAppCurrentSubscriptionPlanService.execute(app.id);
    if (
      !currentSubscriptionPlan?.subscription?.active ||
      !currentSubscriptionPlan?.plan
    ) {
      throw new PlanNotFoundException();
    }
    request.plan = currentSubscriptionPlan.plan;
    return true;
  }
}
