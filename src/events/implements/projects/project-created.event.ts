import { ProjectModel } from '@/models/project.model';

interface IDataProjectCreatedEvent {
  readonly createdBy: string;
  readonly project: ProjectModel;
}

export class ProjectCreatedEvent {
  readonly createdBy: string;
  readonly project: ProjectModel;

  constructor(data: IDataProjectCreatedEvent) {
    this.createdBy = data.createdBy;
    this.project = data.project;
  }
}
