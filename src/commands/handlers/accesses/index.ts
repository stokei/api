import { CreateAccessCommandHandler } from './create-access';
import { RefreshAccessCommandHandler } from './refresh-access';
import { RemoveAccessCommandHandler } from './remove-access';

export const AccessCommandHandlers = [
  CreateAccessCommandHandler,
  RemoveAccessCommandHandler,
  RefreshAccessCommandHandler
];
