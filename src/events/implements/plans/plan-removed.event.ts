import { PlanModel } from '@/models/plan.model';

interface IDataPlanRemovedEvent {
  readonly plan: PlanModel;
}

export class PlanRemovedEvent {
  readonly plan: PlanModel;

  constructor(data: IDataPlanRemovedEvent) {
    this.plan = data.plan;
  }
}
