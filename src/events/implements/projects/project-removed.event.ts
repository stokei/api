import { ProjectModel } from '@/models/project.model';

interface IDataProjectRemovedEvent {
  readonly project: ProjectModel;
}

export class ProjectRemovedEvent {
  readonly project: ProjectModel;

  constructor(data: IDataProjectRemovedEvent) {
    this.project = data.project;
  }
}
