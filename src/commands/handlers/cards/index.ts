import { CreateCardCommandHandler } from './create-card';
import { RemoveCardCommandHandler } from './remove-card';
import { UpdateCardCommandHandler } from './update-card';

export const CardCommandHandlers = [
  CreateCardCommandHandler,
  RemoveCardCommandHandler,
  UpdateCardCommandHandler
];
