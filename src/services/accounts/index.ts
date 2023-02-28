import { AddAccountRoleService } from './add-account-role';
import { ChangePasswordService } from './change-password';
import { CreateAccountService } from './create-account';
import { FindAccountByIdService } from './find-account-by-id';
import { FindAllAccountsService } from './find-all-accounts';
import { ForgotPasswordService } from './forgot-password';
import { LoginService } from './login';
import { RemoveAccountService } from './remove-account';
import { RemoveAccountRoleService } from './remove-account-role';
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
  AddAccountRoleService,
  RemoveAccountRoleService
];
