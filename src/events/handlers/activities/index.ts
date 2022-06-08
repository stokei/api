import { ActivityCreatedHandler } from './activity-created.handler';
import { ActivityUpdatedHandler } from './activity-updated.handler';
import { ActivityRemovedHandler } from './activity-removed.handler';

export const ActivityEventsHandlers = [
  ActivityCreatedHandler,
  ActivityUpdatedHandler,
  ActivityRemovedHandler
];
