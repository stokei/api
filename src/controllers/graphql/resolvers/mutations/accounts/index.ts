import { SignUpResolver } from './singup';
import { RemoveAccountResolver } from './remove-account';
import { UpdateAccountResolver } from './update-account';

export const AccountsMutations = [
  SignUpResolver,
  RemoveAccountResolver,
  UpdateAccountResolver
];
