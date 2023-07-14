import { ChangePasswordService } from './change-password';
import { CompleteAccountConfigurationService } from './complete-account-configuration';
import { CreateAccountService } from './create-account';
import { CreateAccountStripeCustomerService } from './create-account-stripe-customer';
import { FindAccountByEmailAndAppService } from './find-account-by-email-and-app';
import { FindAccountByIdService } from './find-account-by-id';
import { FindAllAccountsService } from './find-all-accounts';
import { ForgotPasswordService } from './forgot-password';
import { LoginService } from './login';
import { RemoveAccountService } from './remove-account';
import { SignUpService } from './signup';
import { UpdateAccountService } from './update-account';

export const AccountServices = [
  CreateAccountService,
  ChangePasswordService,
  RemoveAccountService,
  ForgotPasswordService,
  UpdateAccountService,
  FindAccountByIdService,
  SignUpService,
  LoginService,
  FindAllAccountsService,
  FindAccountByEmailAndAppService,
  CompleteAccountConfigurationService,
  CreateAccountStripeCustomerService
];
