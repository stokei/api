import { ChangePasswordResolver } from './change-password';
import { CreateAccountResolver } from './create-account';
import { ForgotPasswordResolver } from './forgot-password';
import { LoginResolver } from './login';
import { RemoveAccountResolver } from './remove-account';
import { SignUpResolver } from './signup';
import { UpdateAccountResolver } from './update-account';

export const AccountsMutations = [
  ChangePasswordResolver,
  ForgotPasswordResolver,
  LoginResolver,
  RemoveAccountResolver,
  SignUpResolver,
  UpdateAccountResolver,
  CreateAccountResolver
];
