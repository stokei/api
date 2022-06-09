import { ActivitiesActionCreatedHandler } from './activities-action-created.handler';
import { ActivitiesActionRemovedHandler } from './activities-action-removed.handler';
import { ActivitiesActionUpdatedHandler } from './activities-action-updated.handler';

export const ActivitiesActionEventsHandlers = [
  ActivitiesActionCreatedHandler,
  ActivitiesActionUpdatedHandler,
  ActivitiesActionRemovedHandler
];
