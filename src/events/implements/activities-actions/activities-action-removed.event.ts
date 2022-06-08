import { ActivitiesActionModel } from '@/models/activities-action.model';

interface IDataActivitiesActionRemovedEvent {
  readonly activitiesAction: ActivitiesActionModel;
}

export class ActivitiesActionRemovedEvent {
  readonly activitiesAction: ActivitiesActionModel;

  constructor(data: IDataActivitiesActionRemovedEvent) {
    this.activitiesAction = data.activitiesAction;
  }
}
