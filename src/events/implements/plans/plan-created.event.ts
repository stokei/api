import { PlanModel } from '@/models/plan.model';

interface IDataPlanCreatedEvent {
  readonly createdBy: string;
  readonly plan: PlanModel;
}

export class PlanCreatedEvent {
  readonly createdBy: string;
  readonly plan: PlanModel;

  constructor(data: IDataPlanCreatedEvent) {
    this.createdBy = data.createdBy;
    this.plan = data.plan;
  }
}
