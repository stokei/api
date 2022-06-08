import { ProjectsPlanModel } from '@/models/projects-plan.model';

interface IDataProjectsPlanUpdatedEvent {
  readonly projectsPlan: ProjectsPlanModel;
}

export class ProjectsPlanUpdatedEvent {
  readonly projectsPlan: ProjectsPlanModel;

  constructor(data: IDataProjectsPlanUpdatedEvent) {
    this.projectsPlan = data.projectsPlan;
  }
}
