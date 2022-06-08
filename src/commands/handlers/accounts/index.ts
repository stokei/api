import { CreateAccountCommandHandler } from './create-account';
import { RemoveAccountCommandHandler } from './remove-account';
import { SignUpCommandHandler } from './singup';
import { UpdateAccountCommandHandler } from './update-account';

export const AccountCommandHandlers = [
  CreateAccountCommandHandler,
  SignUpCommandHandler,
  RemoveAccountCommandHandler,
  UpdateAccountCommandHandler
];
