import { CountAccountsRepository } from './count-accounts';
import { CreateAccountRepository } from './create-account';
import { ExistsAccountsRepository } from './exists-accounts';
import { FindAccountByEmailRepository } from './find-account-by-email';
import { FindAccountByEmailAndForgotPasswordCodeRepository } from './find-account-by-email-and-forgot-password-code';
import { FindAccountByEmailAndParentRepository } from './find-account-by-email-and-parent';
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
  FindAccountByEmailAndParentRepository,
  FindAllAccountsRepository,
  RemoveAccountRepository,
  UpdateAccountRepository,
  UpdatePasswordRepository,
  UpdateCodeForgotPasswordRepository
];
