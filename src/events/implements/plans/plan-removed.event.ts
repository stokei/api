import { PlanModel } from '@/models/plan.model';

interface IDataPlanRemovedEvent {
  readonly removedBy: string;
  readonly plan: PlanModel;
}

export class PlanRemovedEvent {
  readonly removedBy: string;
  readonly plan: PlanModel;

  constructor(data: IDataPlanRemovedEvent) {
    this.removedBy = data.removedBy;
    this.plan = data.plan;
  }
}
