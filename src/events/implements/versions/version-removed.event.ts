import { VersionModel } from '@/models/version.model';

interface IDataVersionRemovedEvent {
  readonly removedBy: string;
  readonly version: VersionModel;
}

export class VersionRemovedEvent {
  readonly removedBy: string;
  readonly version: VersionModel;

  constructor(data: IDataVersionRemovedEvent) {
    this.removedBy = data.removedBy;
    this.version = data.version;
  }
}
