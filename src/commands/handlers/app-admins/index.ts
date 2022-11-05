import { CreateAppAdminCommandHandler } from './create-app-admin';
import { RemoveAppAdminCommandHandler } from './remove-app-admin';

export const AppAdminCommandHandlers = [
  CreateAppAdminCommandHandler,
  RemoveAppAdminCommandHandler
];
