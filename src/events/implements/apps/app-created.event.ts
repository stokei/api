import { AppModel } from '@/models/app.model';

interface IDataAppCreatedEvent {
  readonly createdBy: string;
  readonly app: AppModel;
}

export class AppCreatedEvent {
  readonly createdBy: string;
  readonly app: AppModel;

  constructor(data: IDataAppCreatedEvent) {
    this.createdBy = data.createdBy;
    this.app = data.app;
  }
}
