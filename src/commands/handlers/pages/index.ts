import { CreatePageCommandHandler } from './create-page';
import { RemovePageCommandHandler } from './remove-page';
import { UpdatePageCommandHandler } from './update-page';

export const PageCommandHandlers = [
  CreatePageCommandHandler,
  RemovePageCommandHandler,
  UpdatePageCommandHandler
];
