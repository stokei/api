import { CreateColorCommandHandler } from './create-color';
import { CreateOrUpdateColorCommandHandler } from './create-or-update-color';
import { RemoveColorCommandHandler } from './remove-color';
import { UpdateColorCommandHandler } from './update-color';

export const ColorCommandHandlers = [
  CreateColorCommandHandler,
  CreateOrUpdateColorCommandHandler,
  RemoveColorCommandHandler,
  UpdateColorCommandHandler
];
