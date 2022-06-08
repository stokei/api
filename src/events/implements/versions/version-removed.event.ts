import { VersionModel } from '@/models/version.model';

interface IDataVersionRemovedEvent {
  readonly version: VersionModel;
}

export class VersionRemovedEvent {
  readonly version: VersionModel;

  constructor(data: IDataVersionRemovedEvent) {
    this.version = data.version;
  }
}
