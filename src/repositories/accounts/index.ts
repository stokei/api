import { CompleteAccountConfigurationRepository } from './complete-account-configuration';
import { CountAccountsRepository } from './count-accounts';
import { CreateAccountRepository } from './create-account';
import { ExistsAccountsRepository } from './exists-accounts';
import { FindAccountByEmailRepository } from './find-account-by-email';
import { FindAccountByEmailAndAppRepository } from './find-account-by-email-and-app';
import { FindAccountByEmailAndForgotPasswordCodeRepository } from './find-account-by-email-and-forgot-password-code';
import { FindAccountByIdRepository } from './find-account-by-id';
import { FindAllAccountsRepository } from './find-all-accounts';
import { RemoveAccountRepository } from './remove-account';
import { UpdateAccountRepository } from './update-account';
import { UpdateCodeForgotPasswordRepository } from './update-code-forgot-password';
import { UpdatePasswordRepository } from './update-password';

export const AccountsRepositories = [
  CountAccountsRepository,
  CreateAccountRepository,
  ExistsAccountsRepository,
  FindAccountByIdRepository,
  FindAccountByEmailRepository,
  FindAccountByEmailAndForgotPasswordCodeRepository,
  FindAccountByEmailAndAppRepository,
  FindAllAccountsRepository,
  RemoveAccountRepository,
  UpdateAccountRepository,
  UpdatePasswordRepository,
  UpdateCodeForgotPasswordRepository,
  CompleteAccountConfigurationRepository
];
