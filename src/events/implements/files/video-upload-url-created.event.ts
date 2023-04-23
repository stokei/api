interface IDataVideoUploadURLCreatedEvent {
  readonly createdBy: string;
  readonly app: string;
  readonly filename: string;
}

export class VideoUploadURLCreatedEvent {
  readonly createdBy: string;
  readonly app: string;
  readonly filename: string;

  constructor(data: IDataVideoUploadURLCreatedEvent) {
    this.createdBy = data.createdBy;
    this.app = data.app;
    this.filename = data.filename;
  }
}
