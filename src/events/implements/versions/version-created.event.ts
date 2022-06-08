import { VersionModel } from '@/models/version.model';

interface IDataVersionCreatedEvent {
  readonly version: VersionModel;
}

export class VersionCreatedEvent {
  readonly version: VersionModel;

  constructor(data: IDataVersionCreatedEvent) {
    this.version = data.version;
  }
}
