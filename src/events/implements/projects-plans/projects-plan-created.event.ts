import { ProjectsPlanModel } from '@/models/projects-plan.model';

interface IDataProjectsPlanCreatedEvent {
  readonly projectsPlan: ProjectsPlanModel;
}

export class ProjectsPlanCreatedEvent {
  readonly projectsPlan: ProjectsPlanModel;

  constructor(data: IDataProjectsPlanCreatedEvent) {
    this.projectsPlan = data.projectsPlan;
  }
}
