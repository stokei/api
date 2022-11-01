import { IQuery } from '@nestjs/cqrs';

import { PlanType } from '@/enums/plan-type.enum';

export class FindPlanPriceByTypeQuery implements IQuery {
  constructor(readonly type: PlanType) {}
}
