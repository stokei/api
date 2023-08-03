import { ChangePasswordCommandHandler } from './change-password';
import { CompleteAccountConfigurationCommandHandler } from './complete-account-configuration';
import { CreateAccountCommandHandler } from './create-account';
import { CreateAccountPagarmeCustomerCommandHandler } from './create-account-pagarme-customer';
import { CreateAccountStripeCustomerCommandHandler } from './create-account-stripe-customer';
import { ForgotPasswordCommandHandler } from './forgot-password';
import { LoginCommandHandler } from './login';
import { RemoveAccountCommandHandler } from './remove-account';
import { SignUpCommandHandler } from './signup';
import { UpdateAccountCommandHandler } from './update-account';
import { UpdateAccountStripeCustomerCommandHandler } from './update-account-stripe-customer';
import { UpdateOwnPasswordCommandHandler } from './update-own-password';

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
  CompleteAccountConfigurationCommandHandler,
  UpdateOwnPasswordCommandHandler,
  CreateAccountPagarmeCustomerCommandHandler
];
