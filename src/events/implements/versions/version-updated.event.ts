import { VersionModel } from '@/models/version.model';

interface IDataVersionUpdatedEvent {
  readonly updatedBy: string;
  readonly version: VersionModel;
}

export class VersionUpdatedEvent {
  readonly updatedBy: string;
  readonly version: VersionModel;

  constructor(data: IDataVersionUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.version = data.version;
  }
}
