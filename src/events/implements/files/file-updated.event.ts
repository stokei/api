import { FileModel } from '@/models/file.model';

interface IDataFileUpdatedEvent {
  readonly file: FileModel;
}

export class FileUpdatedEvent {
  readonly file: FileModel;

  constructor(data: IDataFileUpdatedEvent) {
    this.file = data.file;
  }
}
