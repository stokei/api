import { ProjectModel } from '@/models/project.model';

interface IDataProjectUpdatedEvent {
  readonly project: ProjectModel;
}

export class ProjectUpdatedEvent {
  readonly project: ProjectModel;

  constructor(data: IDataProjectUpdatedEvent) {
    this.project = data.project;
  }
}
