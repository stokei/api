import { CreateAccountCommandHandler } from './create-account';
import { ForgotPasswordCommandHandler } from './forgot-password';
import { LoginCommandHandler } from './login';
import { RemoveAccountCommandHandler } from './remove-account';
import { SignUpCommandHandler } from './signup';
import { UpdateAccountCommandHandler } from './update-account';

export const AccountCommandHandlers = [
  CreateAccountCommandHandler,
  ForgotPasswordCommandHandler,
  LoginCommandHandler,
  SignUpCommandHandler,
  RemoveAccountCommandHandler,
  UpdateAccountCommandHandler
];
