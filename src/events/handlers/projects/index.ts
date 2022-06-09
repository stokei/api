import { ProjectCreatedHandler } from './project-created.handler';
import { ProjectRemovedHandler } from './project-removed.handler';
import { ProjectUpdatedHandler } from './project-updated.handler';

export const ProjectEventsHandlers = [
  ProjectCreatedHandler,
  ProjectUpdatedHandler,
  ProjectRemovedHandler
];
