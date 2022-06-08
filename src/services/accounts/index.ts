import { FindAccountByIdService } from './find-account-by-id';
import { FindAllAccountsService } from './find-all-accounts';
import { CreateAccountService } from './create-account';
import { RemoveAccountService } from './remove-account';
import { UpdateAccountService } from './update-account';
import { SignUpService } from './singup';

export const AccountServices = [
  CreateAccountService,
  RemoveAccountService,
  UpdateAccountService,
  FindAccountByIdService,
  SignUpService,
  FindAllAccountsService
];
