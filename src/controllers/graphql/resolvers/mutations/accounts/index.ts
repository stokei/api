import { RemoveAccountResolver } from './remove-account';
import { SignUpResolver } from './singup';
import { UpdateAccountResolver } from './update-account';

export const AccountsMutations = [
  SignUpResolver,
  RemoveAccountResolver,
  UpdateAccountResolver
];
