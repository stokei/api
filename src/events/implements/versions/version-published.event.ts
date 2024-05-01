import { VersionModel } from '@/models/version.model';

interface IDataVersionPublishedEvent {
  readonly createdBy: string;
  readonly version: VersionModel;
}

export class VersionPublishedEvent {
  readonly createdBy: string;
  readonly version: VersionModel;

  constructor(data: IDataVersionPublishedEvent) {
    this.createdBy = data.createdBy;
    this.version = data.version;
  }
}
