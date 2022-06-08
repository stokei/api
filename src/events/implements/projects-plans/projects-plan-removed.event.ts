import { ProjectsPlanModel } from '@/models/projects-plan.model';

interface IDataProjectsPlanRemovedEvent {
  readonly projectsPlan: ProjectsPlanModel;
}

export class ProjectsPlanRemovedEvent {
  readonly projectsPlan: ProjectsPlanModel;

  constructor(data: IDataProjectsPlanRemovedEvent) {
    this.projectsPlan = data.projectsPlan;
  }
}
