import { ProjectCreatedHandler } from './project-created.handler';
import { ProjectUpdatedHandler } from './project-updated.handler';
import { ProjectRemovedHandler } from './project-removed.handler';

export const ProjectEventsHandlers = [
  ProjectCreatedHandler,
  ProjectUpdatedHandler,
  ProjectRemovedHandler
];
