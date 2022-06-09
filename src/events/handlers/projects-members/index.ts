import { ProjectsMemberCreatedHandler } from './projects-member-created.handler';
import { ProjectsMemberRemovedHandler } from './projects-member-removed.handler';
import { ProjectsMemberUpdatedHandler } from './projects-member-updated.handler';

export const ProjectsMemberEventsHandlers = [
  ProjectsMemberCreatedHandler,
  ProjectsMemberUpdatedHandler,
  ProjectsMemberRemovedHandler
];
