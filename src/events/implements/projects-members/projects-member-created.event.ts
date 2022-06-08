import { ProjectsMemberModel } from '@/models/projects-member.model';

interface IDataProjectsMemberCreatedEvent {
  readonly projectsMember: ProjectsMemberModel;
}

export class ProjectsMemberCreatedEvent {
  readonly projectsMember: ProjectsMemberModel;

  constructor(data: IDataProjectsMemberCreatedEvent) {
    this.projectsMember = data.projectsMember;
  }
}
