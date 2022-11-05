import { AppAdminCreatedHandler } from './app-admin-created.handler';
import { AppAdminRemovedHandler } from './app-admin-removed.handler';

export const AppAdminEventsHandlers = [
  AppAdminCreatedHandler,
  AppAdminRemovedHandler
];
