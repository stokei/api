import { AccountResolver } from './account';
import { AccountsResolver } from './accounts';
import { MeAccountResolver } from './me';

export const AccountsQueries = [
  AccountResolver,
  AccountsResolver,
  MeAccountResolver
];
