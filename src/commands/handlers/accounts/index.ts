import { ChangePasswordCommandHandler } from './change-password';
import { CompleteAccountConfigurationCommandHandler } from './complete-account-configuration';
import { CreateAccountCommandHandler } from './create-account';
import { CreateAccountStripeCustomerCommandHandler } from './create-account-stripe-customer';
import { ForgotPasswordCommandHandler } from './forgot-password';
import { LoginCommandHandler } from './login';
import { RemoveAccountCommandHandler } from './remove-account';
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
  CompleteAccountConfigurationCommandHandler
];
