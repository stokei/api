import { CreatePageCommandHandler } from './create-page';
import { RemovePageCommandHandler } from './remove-page';
import { RemovePageDependenciesCommandHandler } from './remove-page-dependencies';
import { UpdatePageCommandHandler } from './update-page';

export const PageCommandHandlers = [
  CreatePageCommandHandler,
  RemovePageCommandHandler,
  UpdatePageCommandHandler,
  RemovePageDependenciesCommandHandler
];
