import { ProjectsMemberModel } from '@/models/projects-member.model';

interface IDataProjectsMemberUpdatedEvent {
  readonly projectsMember: ProjectsMemberModel;
}

export class ProjectsMemberUpdatedEvent {
  readonly projectsMember: ProjectsMemberModel;

  constructor(data: IDataProjectsMemberUpdatedEvent) {
    this.projectsMember = data.projectsMember;
  }
}
