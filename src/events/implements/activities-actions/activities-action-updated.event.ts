import { ActivitiesActionModel } from '@/models/activities-action.model';

interface IDataActivitiesActionUpdatedEvent {
  readonly activitiesAction: ActivitiesActionModel;
}

export class ActivitiesActionUpdatedEvent {
  readonly activitiesAction: ActivitiesActionModel;

  constructor(data: IDataActivitiesActionUpdatedEvent) {
    this.activitiesAction = data.activitiesAction;
  }
}
