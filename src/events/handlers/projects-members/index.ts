import { ProjectsMemberCreatedHandler } from './projects-member-created.handler';
import { ProjectsMemberUpdatedHandler } from './projects-member-updated.handler';
import { ProjectsMemberRemovedHandler } from './projects-member-removed.handler';

export const ProjectsMemberEventsHandlers = [
  ProjectsMemberCreatedHandler,
  ProjectsMemberUpdatedHandler,
  ProjectsMemberRemovedHandler
];
