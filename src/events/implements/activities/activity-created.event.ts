import { ActivityModel } from '@/models/activity.model';

interface IDataActivityCreatedEvent {
  readonly activity: ActivityModel;
}

export class ActivityCreatedEvent {
  readonly activity: ActivityModel;

  constructor(data: IDataActivityCreatedEvent) {
    this.activity = data.activity;
  }
}
