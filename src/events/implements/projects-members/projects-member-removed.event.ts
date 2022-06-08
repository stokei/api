import { ProjectsMemberModel } from '@/models/projects-member.model';

interface IDataProjectsMemberRemovedEvent {
  readonly projectsMember: ProjectsMemberModel;
}

export class ProjectsMemberRemovedEvent {
  readonly projectsMember: ProjectsMemberModel;

  constructor(data: IDataProjectsMemberRemovedEvent) {
    this.projectsMember = data.projectsMember;
  }
}
