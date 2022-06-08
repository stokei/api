import { ClassroomsAdminCreatedHandler } from './classrooms-admin-created.handler';
import { ClassroomsAdminUpdatedHandler } from './classrooms-admin-updated.handler';
import { ClassroomsAdminRemovedHandler } from './classrooms-admin-removed.handler';

export const ClassroomsAdminEventsHandlers = [
  ClassroomsAdminCreatedHandler,
  ClassroomsAdminUpdatedHandler,
  ClassroomsAdminRemovedHandler
];
