import { CreateImageCommandHandler } from './create-image';
import { RemoveImageCommandHandler } from './remove-image';

export const ImageCommandHandlers = [
  CreateImageCommandHandler,
  RemoveImageCommandHandler
];
