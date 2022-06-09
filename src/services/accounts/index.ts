import { CreateAccountService } from './create-account';
import { FindAccountByIdService } from './find-account-by-id';
import { FindAllAccountsService } from './find-all-accounts';
import { RemoveAccountService } from './remove-account';
import { SignUpService } from './singup';
import { UpdateAccountService } from './update-account';

export const AccountServices = [
  CreateAccountService,
  RemoveAccountService,
  UpdateAccountService,
  FindAccountByIdService,
  SignUpService,
  FindAllAccountsService
];
