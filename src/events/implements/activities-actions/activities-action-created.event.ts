import { ActivitiesActionModel } from '@/models/activities-action.model';

interface IDataActivitiesActionCreatedEvent {
  readonly activitiesAction: ActivitiesActionModel;
}

export class ActivitiesActionCreatedEvent {
  readonly activitiesAction: ActivitiesActionModel;

  constructor(data: IDataActivitiesActionCreatedEvent) {
    this.activitiesAction = data.activitiesAction;
  }
}
