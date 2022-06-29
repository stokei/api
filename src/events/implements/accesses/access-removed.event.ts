import { AccessModel } from '@/models/access.model';

interface IDataAccessRemovedEvent {
  readonly removedBy: string;
  readonly access: AccessModel;
}

export class AccessRemovedEvent {
  readonly removedBy: string;
  readonly access: AccessModel;

  constructor(data: IDataAccessRemovedEvent) {
    this.removedBy = data.removedBy;
    this.access = data.access;
  }
}
