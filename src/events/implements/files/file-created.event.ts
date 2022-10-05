import { FileModel } from '@/models/file.model';

interface IDataFileCreatedEvent {
  readonly createdBy: string;
  readonly file: FileModel;
}

export class FileCreatedEvent {
  readonly createdBy: string;
  readonly file: FileModel;

  constructor(data: IDataFileCreatedEvent) {
    this.createdBy = data.createdBy;
    this.file = data.file;
  }
}
