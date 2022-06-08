import { CreateColorCommandHandler } from './create-color';
import { RemoveColorCommandHandler } from './remove-color';
import { UpdateColorCommandHandler } from './update-color';

export const ColorCommandHandlers = [
  CreateColorCommandHandler,
  RemoveColorCommandHandler,
  UpdateColorCommandHandler
];
