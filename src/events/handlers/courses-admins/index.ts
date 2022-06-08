import { CoursesAdminCreatedHandler } from './courses-admin-created.handler';
import { CoursesAdminUpdatedHandler } from './courses-admin-updated.handler';
import { CoursesAdminRemovedHandler } from './courses-admin-removed.handler';

export const CoursesAdminEventsHandlers = [
  CoursesAdminCreatedHandler,
  CoursesAdminUpdatedHandler,
  CoursesAdminRemovedHandler
];
