import { ProjectModel } from '@/models/project.model';

interface IDataProjectUpdatedEvent {
  readonly updatedBy: string;
  readonly project: ProjectModel;
}

export class ProjectUpdatedEvent {
  readonly updatedBy: string;
  readonly project: ProjectModel;

  constructor(data: IDataProjectUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.project = data.project;
  }
}
