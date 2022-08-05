import { MeAccountAccessesResolver } from './accesses';
import { AccountAppResolver } from './app';
import { AccountReferenceResolver } from './reference';

export const AccountsFieldsResolvers = [
  AccountReferenceResolver,
  MeAccountAccessesResolver,
  AccountAppResolver
];
