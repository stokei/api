import { PlanModel } from '@/models/plan.model';

interface IDataPlanUpdatedEvent {
  readonly plan: PlanModel;
}

export class PlanUpdatedEvent {
  readonly plan: PlanModel;

  constructor(data: IDataPlanUpdatedEvent) {
    this.plan = data.plan;
  }
}
