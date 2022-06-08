import { CreateImageCommandHandler } from './create-image';
import { RemoveImageCommandHandler } from './remove-image';
import { UpdateImageCommandHandler } from './update-image';

export const ImageCommandHandlers = [
  CreateImageCommandHandler,
  RemoveImageCommandHandler,
  UpdateImageCommandHandler
];
