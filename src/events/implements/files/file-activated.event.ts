import { FileModel } from '@/models/file.model';

interface IDataFileActivatedEvent {
  readonly updatedBy: string;
  readonly file: FileModel;
}

export class FileActivatedEvent {
  readonly updatedBy: string;
  readonly file: FileModel;

  constructor(data: IDataFileActivatedEvent) {
    this.updatedBy = data.updatedBy;
    this.file = data.file;
  }
}
