import { ChangePasswordCommandHandler } from './change-password';
import { CompleteAccountConfigurationCommandHandler } from './complete-account-configuration';
import { CreateAccountCommandHandler } from './create-account';
import { CreateAccountPagarmeCustomerCommandHandler } from './create-account-pagarme-customer';
import { ForgotPasswordCommandHandler } from './forgot-password';
import { LoginCommandHandler } from './login';
import { RemoveAccountCommandHandler } from './remove-account';
import { SignUpCommandHandler } from './signup';
import { UpdateAccountCommandHandler } from './update-account';
import { UpdateOwnPasswordCommandHandler } from './update-own-password';

export const AccountCommandHandlers = [
  CreateAccountCommandHandler,
  ChangePasswordCommandHandler,
  ForgotPasswordCommandHandler,
  LoginCommandHandler,
  SignUpCommandHandler,
  RemoveAccountCommandHandler,
  UpdateAccountCommandHandler,
  CompleteAccountConfigurationCommandHandler,
  UpdateOwnPasswordCommandHandler,
  CreateAccountPagarmeCustomerCommandHandler
];
