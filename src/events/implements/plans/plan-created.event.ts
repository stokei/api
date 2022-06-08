import { PlanModel } from '@/models/plan.model';

interface IDataPlanCreatedEvent {
  readonly plan: PlanModel;
}

export class PlanCreatedEvent {
  readonly plan: PlanModel;

  constructor(data: IDataPlanCreatedEvent) {
    this.plan = data.plan;
  }
}
