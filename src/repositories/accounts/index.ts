import { CountAccountsRepository } from './count-accounts';
import { CreateAccountRepository } from './create-account';
import { ExistsAccountsRepository } from './exists-accounts';
import { FindAccountByIdRepository } from './find-account-by-id';
import { FindAllAccountsRepository } from './find-all-accounts';
import { RemoveAccountRepository } from './remove-account';
import { UpdateAccountRepository } from './update-account';

export const AccountsRepositories = [
  CountAccountsRepository,
  CreateAccountRepository,
  ExistsAccountsRepository,
  FindAccountByIdRepository,
  FindAllAccountsRepository,
  RemoveAccountRepository,
  UpdateAccountRepository
];
