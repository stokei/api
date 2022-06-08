import { ProjectModel } from '@/models/project.model';

interface IDataProjectCreatedEvent {
  readonly project: ProjectModel;
}

export class ProjectCreatedEvent {
  readonly project: ProjectModel;

  constructor(data: IDataProjectCreatedEvent) {
    this.project = data.project;
  }
}
