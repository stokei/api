import { ProjectCreatedHandler } from './project-created.handler';
import { ProjectUpdatedHandler } from './project-updated.handler';

export const ProjectEventsHandlers = [
  ProjectCreatedHandler,
  ProjectUpdatedHandler
];
