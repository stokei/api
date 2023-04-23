import { FileModel } from '@/models/file.model';

interface IDataFileRemovedEvent {
  readonly removedBy: string;
  readonly file: FileModel;
}

export class FileRemovedEvent {
  readonly removedBy: string;
  readonly file: FileModel;

  constructor(data: IDataFileRemovedEvent) {
    this.removedBy = data.removedBy;
    this.file = data.file;
  }
}
