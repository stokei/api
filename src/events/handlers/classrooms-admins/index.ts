import { ClassroomsAdminCreatedHandler } from './classrooms-admin-created.handler';
import { ClassroomsAdminRemovedHandler } from './classrooms-admin-removed.handler';
import { ClassroomsAdminUpdatedHandler } from './classrooms-admin-updated.handler';

export const ClassroomsAdminEventsHandlers = [
  ClassroomsAdminCreatedHandler,
  ClassroomsAdminUpdatedHandler,
  ClassroomsAdminRemovedHandler
];
