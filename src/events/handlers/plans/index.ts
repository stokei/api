import { PlanCreatedHandler } from './plan-created.handler';
import { PlanUpdatedHandler } from './plan-updated.handler';
import { PlanRemovedHandler } from './plan-removed.handler';

export const PlanEventsHandlers = [
  PlanCreatedHandler,
  PlanUpdatedHandler,
  PlanRemovedHandler
];
