import { CreateAccountService } from './create-account';
import { FindAccountByIdService } from './find-account-by-id';
import { FindAllAccountsService } from './find-all-accounts';
import { LoginService } from './login';
import { RemoveAccountService } from './remove-account';
import { SignUpService } from './signup';
import { UpdateAccountService } from './update-account';

export const AccountServices = [
  CreateAccountService,
  RemoveAccountService,
  UpdateAccountService,
  FindAccountByIdService,
  SignUpService,
  LoginService,
  FindAllAccountsService
];
