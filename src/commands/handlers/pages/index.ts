import { CreateLoginPageCommandHandler } from './create-login-page';
import { CreatePageCommandHandler } from './create-page';
import { CreateSignUpPageCommandHandler } from './create-signup-page';
import { RemovePageCommandHandler } from './remove-page';
import { RemovePageDependenciesCommandHandler } from './remove-page-dependencies';
import { UpdatePageCommandHandler } from './update-page';

export const PageCommandHandlers = [
  CreatePageCommandHandler,
  CreateLoginPageCommandHandler,
  CreateSignUpPageCommandHandler,
  RemovePageCommandHandler,
  UpdatePageCommandHandler,
  RemovePageDependenciesCommandHandler
];
