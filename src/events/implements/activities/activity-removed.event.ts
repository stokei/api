import { ActivityModel } from '@/models/activity.model';

interface IDataActivityRemovedEvent {
  readonly activity: ActivityModel;
}

export class ActivityRemovedEvent {
  readonly activity: ActivityModel;

  constructor(data: IDataActivityRemovedEvent) {
    this.activity = data.activity;
  }
}
