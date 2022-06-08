import { FileModel } from '@/models/file.model';

interface IDataFileCreatedEvent {
  readonly file: FileModel;
}

export class FileCreatedEvent {
  readonly file: FileModel;

  constructor(data: IDataFileCreatedEvent) {
    this.file = data.file;
  }
}
