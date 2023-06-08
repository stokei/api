import { AccountResolver } from './account';
import { AccountByEmailResolver } from './account-by-email';
import { AccountsResolver } from './accounts';
import { MeAccountResolver } from './me';

export const AccountsQueries = [
  AccountResolver,
  AccountsResolver,
  MeAccountResolver,
  AccountByEmailResolver
];
