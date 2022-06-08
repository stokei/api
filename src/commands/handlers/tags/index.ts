import { CreateTagCommandHandler } from './create-tag';
import { RemoveTagCommandHandler } from './remove-tag';
import { UpdateTagCommandHandler } from './update-tag';

export const TagCommandHandlers = [
  CreateTagCommandHandler,
  RemoveTagCommandHandler,
  UpdateTagCommandHandler
];
