import { ProjectsPlanCreatedHandler } from './projects-plan-created.handler';
import { ProjectsPlanRemovedHandler } from './projects-plan-removed.handler';
import { ProjectsPlanUpdatedHandler } from './projects-plan-updated.handler';

export const ProjectsPlanEventsHandlers = [
  ProjectsPlanCreatedHandler,
  ProjectsPlanUpdatedHandler,
  ProjectsPlanRemovedHandler
];
