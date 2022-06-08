import { ActivitiesActionCreatedHandler } from './activities-action-created.handler';
import { ActivitiesActionUpdatedHandler } from './activities-action-updated.handler';
import { ActivitiesActionRemovedHandler } from './activities-action-removed.handler';

export const ActivitiesActionEventsHandlers = [
  ActivitiesActionCreatedHandler,
  ActivitiesActionUpdatedHandler,
  ActivitiesActionRemovedHandler
];
