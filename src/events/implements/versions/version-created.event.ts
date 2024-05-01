import { VersionModel } from '@/models/version.model';

interface IDataVersionCreatedEvent {
  readonly createdBy: string;
  readonly version: VersionModel;
}

export class VersionCreatedEvent {
  readonly createdBy: string;
  readonly version: VersionModel;

  constructor(data: IDataVersionCreatedEvent) {
    this.createdBy = data.createdBy;
    this.version = data.version;
  }
}
