import { AccessModel } from '@/models/access.model';

interface IDataAccessUpdatedEvent {
  readonly access: AccessModel;
}

export class AccessUpdatedEvent {
  readonly access: AccessModel;

  constructor(data: IDataAccessUpdatedEvent) {
    this.access = data.access;
  }
}
