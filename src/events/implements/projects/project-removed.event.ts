import { ProjectModel } from '@/models/project.model';

interface IDataProjectRemovedEvent {
  readonly removedBy: string;
  readonly project: ProjectModel;
}

export class ProjectRemovedEvent {
  readonly removedBy: string;
  readonly project: ProjectModel;

  constructor(data: IDataProjectRemovedEvent) {
    this.removedBy = data.removedBy;
    this.project = data.project;
  }
}
