import { PlanCreatedHandler } from './plan-created.handler';
import { PlanRemovedHandler } from './plan-removed.handler';
import { PlanUpdatedHandler } from './plan-updated.handler';

export const PlanEventsHandlers = [
  PlanCreatedHandler,
  PlanUpdatedHandler,
  PlanRemovedHandler
];
