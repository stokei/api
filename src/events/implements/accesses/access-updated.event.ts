import { AccessModel } from '@/models/access.model';

interface IDataAccessUpdatedEvent {
  readonly updatedBy: string;
  readonly access: AccessModel;
}

export class AccessUpdatedEvent {
  readonly updatedBy: string;
  readonly access: AccessModel;

  constructor(data: IDataAccessUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.access = data.access;
  }
}
