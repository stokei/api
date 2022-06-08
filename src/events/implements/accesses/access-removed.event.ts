import { AccessModel } from '@/models/access.model';

interface IDataAccessRemovedEvent {
  readonly access: AccessModel;
}

export class AccessRemovedEvent {
  readonly access: AccessModel;

  constructor(data: IDataAccessRemovedEvent) {
    this.access = data.access;
  }
}
