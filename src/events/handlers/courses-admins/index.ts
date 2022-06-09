import { CoursesAdminCreatedHandler } from './courses-admin-created.handler';
import { CoursesAdminRemovedHandler } from './courses-admin-removed.handler';
import { CoursesAdminUpdatedHandler } from './courses-admin-updated.handler';

export const CoursesAdminEventsHandlers = [
  CoursesAdminCreatedHandler,
  CoursesAdminUpdatedHandler,
  CoursesAdminRemovedHandler
];
