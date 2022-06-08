import { VersionModel } from '@/models/version.model';

interface IDataVersionUpdatedEvent {
  readonly version: VersionModel;
}

export class VersionUpdatedEvent {
  readonly version: VersionModel;

  constructor(data: IDataVersionUpdatedEvent) {
    this.version = data.version;
  }
}
