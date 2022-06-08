import { ProjectsPlanCreatedHandler } from './projects-plan-created.handler';
import { ProjectsPlanUpdatedHandler } from './projects-plan-updated.handler';
import { ProjectsPlanRemovedHandler } from './projects-plan-removed.handler';

export const ProjectsPlanEventsHandlers = [
  ProjectsPlanCreatedHandler,
  ProjectsPlanUpdatedHandler,
  ProjectsPlanRemovedHandler
];
