import { CreateAccessCommandHandler } from './create-access';
import { RemoveAccessCommandHandler } from './remove-access';
import { UpdateAccessCommandHandler } from './update-access';

export const AccessCommandHandlers = [
  CreateAccessCommandHandler,
  RemoveAccessCommandHandler,
  UpdateAccessCommandHandler
];
