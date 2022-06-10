import { CreateAccountCommandHandler } from './create-account';
import { LoginCommandHandler } from './login';
import { RemoveAccountCommandHandler } from './remove-account';
import { SignUpCommandHandler } from './signup';
import { UpdateAccountCommandHandler } from './update-account';

export const AccountCommandHandlers = [
  CreateAccountCommandHandler,
  LoginCommandHandler,
  SignUpCommandHandler,
  RemoveAccountCommandHandler,
  UpdateAccountCommandHandler
];
