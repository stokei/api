import { PlanModel } from '@/models/plan.model';

interface IDataPlanUpdatedEvent {
  readonly updatedBy: string;
  readonly plan: PlanModel;
}

export class PlanUpdatedEvent {
  readonly updatedBy: string;
  readonly plan: PlanModel;

  constructor(data: IDataPlanUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.plan = data.plan;
  }
}
