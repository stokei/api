import { AppModel } from '@/models/app.model';

interface IDataAppUpdatedEvent {
  readonly updatedBy: string;
  readonly app: AppModel;
}

export class AppUpdatedEvent {
  readonly updatedBy: string;
  readonly app: AppModel;

  constructor(data: IDataAppUpdatedEvent) {
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
