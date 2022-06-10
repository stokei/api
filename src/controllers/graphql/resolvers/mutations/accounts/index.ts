import { LoginResolver } from './login';
import { RemoveAccountResolver } from './remove-account';
import { SignUpResolver } from './signup';
import { UpdateAccountResolver } from './update-account';

export const AccountsMutations = [
  SignUpResolver,
  LoginResolver,
  RemoveAccountResolver,
  UpdateAccountResolver
];
