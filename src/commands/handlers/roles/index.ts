import { CreateRoleCommandHandler } from './create-role';
import { RemoveRoleCommandHandler } from './remove-role';

export const RoleCommandHandlers = [
  CreateRoleCommandHandler,
  RemoveRoleCommandHandler
];
