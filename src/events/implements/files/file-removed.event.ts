import { FileModel } from '@/models/file.model';

interface IDataFileRemovedEvent {
  readonly file: FileModel;
}

export class FileRemovedEvent {
  readonly file: FileModel;

  constructor(data: IDataFileRemovedEvent) {
    this.file = data.file;
  }
}
