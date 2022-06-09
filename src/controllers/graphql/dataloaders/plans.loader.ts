import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllPlansService } from '@/services/plans/find-all-plans';

@Injectable({ scope: Scope.REQUEST })
export class PlansLoader {
  constructor(private readonly plansService: FindAllPlansService) {}

  readonly findByIds = new DataLoader(async (planIds: string[]) => {
    const plans = await this.plansService.execute({
      where: {
        AND: {
          ids: planIds
        }
      }
    });
    const plansMap = new Map(plans?.items?.map((plan) => [plan.id, plan]));
    return planIds.map((planId) => plansMap.get(planId));
  });
}
