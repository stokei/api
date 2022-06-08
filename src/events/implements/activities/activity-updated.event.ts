import { ActivityModel } from '@/models/activity.model';

interface IDataActivityUpdatedEvent {
  readonly activity: ActivityModel;
}

export class ActivityUpdatedEvent {
  readonly activity: ActivityModel;

  constructor(data: IDataActivityUpdatedEvent) {
    this.activity = data.activity;
  }
}
