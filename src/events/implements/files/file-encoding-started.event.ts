import { FileModel } from '@/models/file.model';

interface IDataFileEncodingStartedEvent {
  readonly updatedBy: string;
  readonly file: FileModel;
}

export class FileEncodingStartedEvent {
  readonly updatedBy: string;
  readonly file: FileModel;

  constructor(data: IDataFileEncodingStartedEvent) {
    this.updatedBy = data.updatedBy;
    this.file = data.file;
  }
}
