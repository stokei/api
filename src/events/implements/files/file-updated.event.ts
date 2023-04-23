import { FileModel } from '@/models/file.model';

interface IDataFileUpdatedEvent {
  readonly updatedBy: string;
  readonly file: FileModel;
}

export class FileUpdatedEvent {
  readonly updatedBy: string;
  readonly file: FileModel;

  constructor(data: IDataFileUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.file = data.file;
  }
}
