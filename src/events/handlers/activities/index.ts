import { ActivityCreatedHandler } from './activity-created.handler';
import { ActivityRemovedHandler } from './activity-removed.handler';
import { ActivityUpdatedHandler } from './activity-updated.handler';

export const ActivityEventsHandlers = [
  ActivityCreatedHandler,
  ActivityUpdatedHandler,
  ActivityRemovedHandler
];
