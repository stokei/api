import { ChangePasswordResolver } from './change-password';
import { CompleteAccountConfigurationResolver } from './complete-account-configuration';
import { CreateAccountResolver } from './create-account';
import { CreateAccountPagarmeCustomerResolver } from './create-account-pagarme-customer';
import { ForgotPasswordResolver } from './forgot-password';
import { LoginResolver } from './login';
import { RemoveAccountResolver } from './remove-account';
import { SignUpResolver } from './signup';
import { UpdateAccountResolver } from './update-account';
import { UpdateOwnPasswordResolver } from './update-own-password';

export const AccountsMutations = [
  ChangePasswordResolver,
  ForgotPasswordResolver,
  LoginResolver,
  RemoveAccountResolver,
  SignUpResolver,
  UpdateAccountResolver,
  CreateAccountResolver,
  CompleteAccountConfigurationResolver,
  UpdateOwnPasswordResolver,
  CreateAccountPagarmeCustomerResolver
];
