import { AddAccountRoleCommandHandler } from './add-account-role';
import { ChangePasswordCommandHandler } from './change-password';
import { CreateAccountCommandHandler } from './create-account';
import { CreateAccountStripeCustomerCommandHandler } from './create-account-stripe-customer';
import { ForgotPasswordCommandHandler } from './forgot-password';
import { LoginCommandHandler } from './login';
import { RemoveAccountCommandHandler } from './remove-account';
import { RemoveAccountRoleCommandHandler } from './remove-account-role';
import { SignUpCommandHandler } from './signup';
import { UpdateAccountCommandHandler } from './update-account';
import { UpdateAccountStripeCustomerCommandHandler } from './update-account-stripe-customer';

export const AccountCommandHandlers = [
  CreateAccountCommandHandler,
  ChangePasswordCommandHandler,
  ForgotPasswordCommandHandler,
  LoginCommandHandler,
  SignUpCommandHandler,
  RemoveAccountCommandHandler,
  UpdateAccountCommandHandler,
  CreateAccountStripeCustomerCommandHandler,
  UpdateAccountStripeCustomerCommandHandler,
  AddAccountRoleCommandHandler,
  RemoveAccountRoleCommandHandler
];
